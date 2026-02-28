from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime
import json
import os

router = APIRouter(
    tags=["feedback"],
)

class FeedbackSubmit(BaseModel):
    name: str
    email: str
    category: str
    message: str

class AdminLogin(BaseModel):
    username: str
    password: str

FEEDBACK_FILE = "data/feedbacks.json"
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"  # Change this in production!

def load_feedbacks():
    """Load feedbacks from JSON file"""
    if not os.path.exists(FEEDBACK_FILE):
        os.makedirs(os.path.dirname(FEEDBACK_FILE), exist_ok=True)
        with open(FEEDBACK_FILE, 'w') as f:
            json.dump([], f)
        return []
    
    try:
        with open(FEEDBACK_FILE, 'r') as f:
            return json.load(f)
    except:
        return []

def save_feedbacks(feedbacks):
    """Save feedbacks to JSON file"""
    os.makedirs(os.path.dirname(FEEDBACK_FILE), exist_ok=True)
    with open(FEEDBACK_FILE, 'w') as f:
        json.dump(feedbacks, f, indent=2)

@router.post("/submit_feedback")
async def submit_feedback(feedback: FeedbackSubmit):
    try:
        feedbacks = load_feedbacks()
        
        new_feedback = {
            "id": len(feedbacks) + 1,
            "name": feedback.name,
            "email": feedback.email,
            "category": feedback.category,
            "message": feedback.message,
            "timestamp": datetime.now().isoformat(),
            "status": "new"
        }
        
        feedbacks.append(new_feedback)
        save_feedbacks(feedbacks)
        
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
        feedbacks = load_feedbacks()
        return {"feedbacks": feedbacks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/admin/feedback/{feedback_id}")
async def delete_feedback(feedback_id: int):
    try:
        feedbacks = load_feedbacks()
        feedbacks = [f for f in feedbacks if f["id"] != feedback_id]
        save_feedbacks(feedbacks)
        return {"success": True, "message": "Feedback deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/admin/feedback/{feedback_id}/status")
async def update_feedback_status(feedback_id: int, status: str):
    try:
        feedbacks = load_feedbacks()
        for feedback in feedbacks:
            if feedback["id"] == feedback_id:
                feedback["status"] = status
                break
        save_feedbacks(feedbacks)
        return {"success": True, "message": "Status updated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
