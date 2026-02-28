from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(
    tags=["general"],
)

class EssayRequest(BaseModel):
    topic: str
    essay_type: str

def generate_outline(topic: str, essay_type: str) -> str:
    """Generate essay outline based on type"""
    
    outlines = {
        "argumentative": f"""ARGUMENTATIVE ESSAY OUTLINE

Topic: {topic}

I. Introduction
   A. Hook: Engaging opening statement
   B. Background information on {topic}
   C. Thesis statement: Clear position on the topic

II. Body Paragraph 1 - First Argument
   A. Topic sentence supporting thesis
   B. Evidence/example
   C. Explanation of how evidence supports argument
   D. Transition to next point

III. Body Paragraph 2 - Second Argument
   A. Topic sentence with additional support
   B. Evidence/example
   C. Analysis and connection to thesis
   D. Transition

IV. Body Paragraph 3 - Counterargument & Rebuttal
   A. Present opposing viewpoint
   B. Acknowledge validity where appropriate
   C. Refute with evidence
   D. Strengthen your position

V. Conclusion
   A. Restate thesis in new words
   B. Summarize main arguments
   C. Call to action or final thought
   D. Closing statement""",

        "persuasive": f"""PERSUASIVE ESSAY OUTLINE

Topic: {topic}

I. Introduction
   A. Attention-grabbing hook
   B. Background on {topic}
   C. Clear thesis statement with your position

II. Reason 1
   A. First reason supporting your position
   B. Supporting evidence and examples
   C. Emotional or logical appeal
   D. Connection to audience

III. Reason 2
   A. Second compelling reason
   B. Facts, statistics, or expert opinions
   C. Real-world examples
   D. Address audience concerns

IV. Reason 3
   A. Strongest reason
   B. Most convincing evidence
   C. Personal anecdotes or case studies
   D. Anticipate objections

V. Conclusion
   A. Restate position powerfully
   B. Summarize key reasons
   C. Strong call to action
   D. Memorable closing""",

        "expository": f"""EXPOSITORY ESSAY OUTLINE

Topic: {topic}

I. Introduction
   A. Hook to engage reader
   B. Brief overview of {topic}
   C. Thesis: Main idea to be explained

II. Body Paragraph 1 - First Main Point
   A. Topic sentence
   B. Explanation and details
   C. Examples and evidence
   D. Transition

III. Body Paragraph 2 - Second Main Point
   A. Topic sentence
   B. Further explanation
   C. Supporting facts and data
   D. Transition

IV. Body Paragraph 3 - Third Main Point
   A. Topic sentence
   B. Additional information
   C. Examples and illustrations
   D. Transition

V. Conclusion
   A. Restate thesis
   B. Summarize main points
   C. Final insights
   D. Closing thought""",

        "descriptive": f"""DESCRIPTIVE ESSAY OUTLINE

Topic: {topic}

I. Introduction
   A. Vivid opening description
   B. Context for {topic}
   C. Thesis: Overall impression or main idea

II. Physical Description
   A. Visual details (sight)
   B. Specific characteristics
   C. Spatial organization
   D. Vivid imagery

III. Sensory Details
   A. Sounds associated with topic
   B. Smells and tastes (if applicable)
   C. Textures and physical sensations
   D. Emotional responses

IV. Deeper Meaning
   A. Significance of the subject
   B. Personal connection
   C. Broader implications
   D. Lasting impression

V. Conclusion
   A. Summarize key descriptions
   B. Reinforce main impression
   C. Reflective closing
   D. Memorable final image""",

        "narrative": f"""NARRATIVE ESSAY OUTLINE

Topic: {topic}

I. Introduction
   A. Engaging opening scene
   B. Setting and context
   C. Introduction of main characters
   D. Hint at the story's significance

II. Rising Action
   A. Initial situation
   B. First key event
   C. Character development
   D. Building tension

III. Climax
   A. Turning point of the story
   B. Most intense moment
   C. Critical decision or revelation
   D. Peak of conflict

IV. Falling Action
   A. Consequences of climax
   B. Resolution of conflicts
   C. Character changes
   D. Lessons learned

V. Conclusion
   A. Reflection on experience
   B. Significance of events
   C. Personal growth or insight
   D. Memorable ending""",

        "compare-contrast": f"""COMPARE AND CONTRAST ESSAY OUTLINE

Topic: {topic}

I. Introduction
   A. Hook introducing both subjects
   B. Background on items being compared
   C. Thesis: Main point of comparison

II. Similarities
   A. First similarity
      1. Subject A
      2. Subject B
   B. Second similarity
      1. Subject A
      2. Subject B
   C. Third similarity
      1. Subject A
      2. Subject B

III. Differences
   A. First difference
      1. Subject A
      2. Subject B
   B. Second difference
      1. Subject A
      2. Subject B
   C. Third difference
      1. Subject A
      2. Subject B

IV. Analysis
   A. Significance of similarities
   B. Importance of differences
   C. Overall evaluation
   D. Implications

V. Conclusion
   A. Restate thesis
   B. Summarize key comparisons
   C. Final judgment or recommendation
   D. Closing thought"""
    }
    
    return outlines.get(essay_type, outlines["argumentative"])

@router.post("/essay_outline")
async def create_outline(request: EssayRequest):
    try:
        if not request.topic or not request.topic.strip():
            raise HTTPException(status_code=400, detail="Topic is required")
        
        outline = generate_outline(request.topic, request.essay_type)
        
        return {"outline": outline}
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
