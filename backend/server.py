from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List
from agent import generate_recommendations
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="PathfindAI API",
    description="AI-powered career recommendations",
    version="1.0.0"
)

# CORS middleware - Allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Data Models
class UserProfile(BaseModel):
    current_role: str = Field(..., description="Current job role")
    experience_level: str = Field(..., description="Experience level")
    education_level: str = Field(..., description="Education level")
    location: str = Field(..., description="Location")
    current_salary: Optional[int] = Field(None, description="Current salary")
    target_salary: Optional[int] = Field(None, description="Target salary")
    time_commitment: str = Field(..., description="Time commitment for learning")
    skills: Optional[List[str]] = Field(default_factory=list, description="Current skills")
    interests: Optional[List[str]] = Field(default_factory=list, description="Interests")

# Routes
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "PathfindAI Career Intelligence API",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "PathfindAI API"
    }

@app.post("/profile")
async def submit_profile(profile: UserProfile):
    """Submit profile and get career recommendations"""
    try:
        logger.info(f"Received profile submission for role: {profile.current_role}")
        
        # Prepare data for the AI agent
        profile_data = {
            "skill": profile.current_role,
            "experience_level": profile.experience_level,
            "location": profile.location,
            "income_goal": str(profile.target_salary) if profile.target_salary else ""
        }
        
        # Generate recommendations using your existing agent
        recommendations = generate_recommendations(profile_data)
        
        return {
            "success": True,
            "message": "Recommendations generated successfully",
            "data": {
                "recommendations": recommendations,
                "profile_summary": {
                    "role": profile.current_role,
                    "experience": profile.experience_level,
                    "location": profile.location,
                    "current_salary": profile.current_salary,
                    "target_salary": profile.target_salary,
                    "time_commitment": profile.time_commitment
                }
            }
        }
        
    except Exception as e:
        logger.error(f"Error generating recommendations: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate recommendations: {str(e)}"
        )

@app.get("/insights")
async def get_insights():
    """Get general career insights"""
    try:
        insights = {
            "trending_skills": [
                "Artificial Intelligence",
                "Machine Learning", 
                "Cloud Computing",
                "Cybersecurity",
                "Data Science",
                "Full-Stack Development"
            ],
            "high_demand_roles": [
                "Software Engineer",
                "Data Scientist", 
                "DevOps Engineer",
                "Product Manager",
                "UX Designer",
                "Cybersecurity Analyst"
            ],
            "salary_trends": {
                "software_engineer": "$85,000 - $150,000",
                "data_scientist": "$95,000 - $165,000",
                "product_manager": "$90,000 - $160,000",
                "ux_designer": "$70,000 - $120,000"
            },
            "growth_sectors": [
                "Technology",
                "Healthcare",
                "Finance",
                "E-commerce",
                "Remote Work Solutions"
            ]
        }
        
        return {
            "success": True,
            "message": "Career insights retrieved successfully",
            "data": insights
        }
        
    except Exception as e:
        logger.error(f"Error fetching insights: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to fetch career insights"
        )

# Error handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return {
        "success": False,
        "message": exc.detail,
        "status_code": exc.status_code
    }

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {str(exc)}")
    return {
        "success": False,
        "message": "Internal server error",
        "status_code": 500
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "server:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True
    )