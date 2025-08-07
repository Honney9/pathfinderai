import google.generativeai as genai
import os
from dotenv import load_dotenv
import json

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-2.5-flash')

class IncomePathwayAdvisor:
    def __init__(self):
        self.model = model

    def generate_recommendations(self, user_data: dict):
        skill = user_data.get("skill", "")
        experience_level = user_data.get("experience_level", "")
        location = user_data.get("location", "")
        income_goal = user_data.get("income_goal", "")

        prompt = f"""
        Act as a skill-to-income pathway advisor.

        User's skills: {skill}
        Experience Level: {experience_level}
        Location: {location}
        Income Goal: {income_goal}

        1. Based on the user's profile, suggest a job opportunity or gig.
        2. Provide income ranges where possible.
        3. Provide local market stats for the user's location. Include:
            - Average salary in {location}
            - Approximate number of job openings
            - Top hiring companies in {location}
        4. Create a personalized learning roadmap in 5–6 concise, actionable steps to reach the income goal.

        Return the response in this **structured JSON** format:
            {{
                "job": "...",
                "required_experience": "...",
                "skills": ["...", "..."],
                "salary": "...",
                "market_stats": {{
                    "average_salary": "...",
                    "openings": "...",
                    "top_companies": ["...", "..."]
            }},
            "roadmap": ["...", "...", "..."]
        }}
        """

        response = self.model.generate_content(prompt)

        print("\n--- AI RAW RESPONSE ---\n")
        print(response.text)
        print("\n-----------------------\n")

        try:
            raw_text = response.text.strip()

            # Remove markdown code block wrappers like ```json\n...\n```
            if raw_text.startswith("```json"):
                raw_text = raw_text.removeprefix("```json").strip()
            if raw_text.endswith("```"):
                raw_text = raw_text.removesuffix("```").strip()

            return json.loads(raw_text)
        except Exception as e:
            return {
                "error": "Failed to parse AI response. Raw output:",
                "raw_response": response.text.strip()
            }
        
advisor = IncomePathwayAdvisor()

def generate_recommendations(user_data: dict):
    return advisor.generate_recommendations(user_data)



