from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime
import os
import sqlite3

router = APIRouter(
    tags=["feedback"],
)

# Construct absolute path to database relative to this file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_PATH = os.path.join(BASE_DIR, "../../database/feedbacks.db")

# Ensure the database directory exists
os.makedirs(os.path.dirname(DATABASE_PATH), exist_ok=True)

def init_db():
    with sqlite3.connect(DATABASE_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS feedbacks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                category TEXT NOT NULL,
                message TEXT NOT NULL,
                timestamp TEXT NOT NULL,
                status TEXT DEFAULT 'new'
            )
        """)
        conn.commit()

init_db()

class FeedbackSubmit(BaseModel):
    name: str
    email: str
    category: str
    message: str

class AdminLogin(BaseModel):
    username: str
    password: str

ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"  # Change this in production!

@router.post("/submit_feedback")
async def submit_feedback(feedback: FeedbackSubmit):
    try:
        with sqlite3.connect(DATABASE_PATH) as conn:
            cursor = conn.cursor()
            timestamp = datetime.now().isoformat()
            cursor.execute("""
                INSERT INTO feedbacks (name, email, category, message, timestamp, status)
                VALUES (?, ?, ?, ?, ?, 'new')
            """, (feedback.name, feedback.email, feedback.category, feedback.message, timestamp))
            conn.commit()
        
        return {"success": True, "message": "Feedback submitted successfully"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/admin/login")
async def admin_login(login: AdminLogin):
    if login.username == ADMIN_USERNAME and login.password == ADMIN_PASSWORD:
        return {"success": True, "message": "Login successful"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

@router.get("/admin/feedbacks")
async def get_feedbacks():
    try:
        with sqlite3.connect(DATABASE_PATH) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM feedbacks")
            rows = cursor.fetchall()
            feedbacks = [dict(row) for row in rows]
        return {"feedbacks": feedbacks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/admin/feedback/{feedback_id}")
async def delete_feedback(feedback_id: int):
    try:
        with sqlite3.connect(DATABASE_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM feedbacks WHERE id = ?", (feedback_id,))
            conn.commit()
            if cursor.rowcount == 0:
                 raise HTTPException(status_code=404, detail="Feedback not found")
        return {"success": True, "message": "Feedback deleted"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/admin/feedback/{feedback_id}/status")
async def update_feedback_status(feedback_id: int, status: str):
    try:
        with sqlite3.connect(DATABASE_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute("UPDATE feedbacks SET status = ? WHERE id = ?", (status, feedback_id))
            conn.commit()
            if cursor.rowcount == 0:
                 raise HTTPException(status_code=404, detail="Feedback not found")
        return {"success": True, "message": "Status updated"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
