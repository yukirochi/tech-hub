from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import hashlib
import re

router = APIRouter(
    tags=["general"],
)

class PlagiarismRequest(BaseModel):
    content: str

@router.post("/plagiarism_check")
async def check_plagiarism(request: PlagiarismRequest):
    try:
        if not request.content or not request.content.strip():
            raise HTTPException(status_code=400, detail="Content is required")
        
        text = request.content.strip()
        
        # Count words and sentences
        words = text.split()
        word_count = len(words)
        sentences = re.split(r'[.!?]+', text)
        sentence_count = len([s for s in sentences if s.strip()])
        
        # Calculate uniqueness score based on text patterns
        # This is a simplified check - real plagiarism detection requires external APIs
        unique_words = len(set(word.lower() for word in words if len(word) > 3))
        total_words = len([word for word in words if len(word) > 3])
        
        if total_words == 0:
            uniqueness_score = 100
        else:
            # Calculate based on vocabulary diversity
            vocabulary_ratio = (unique_words / total_words) * 100
            
            # Check for common phrases (simplified)
            common_phrases = [
                'in conclusion', 'in summary', 'as a result', 'for example',
                'on the other hand', 'in addition', 'furthermore', 'moreover'
            ]
            phrase_count = sum(1 for phrase in common_phrases if phrase in text.lower())
            phrase_penalty = min(phrase_count * 2, 20)
            
            # Calculate final score
            uniqueness_score = min(100, max(0, vocabulary_ratio - phrase_penalty))
            uniqueness_score = round(uniqueness_score)
        
        # Determine status
        if uniqueness_score >= 80:
            status = "Excellent - Highly Original"
        elif uniqueness_score >= 60:
            status = "Good - Mostly Original"
        elif uniqueness_score >= 40:
            status = "Fair - Some Concerns"
        else:
            status = "Poor - Needs Review"
        
        return {
            "uniqueness_score": uniqueness_score,
            "word_count": word_count,
            "sentence_count": sentence_count,
            "status": status
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
