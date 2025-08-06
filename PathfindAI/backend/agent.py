import google.generativeai as genai


class IncomePathwayAdvisor:
    def __init__(self, api_key):
        genai.configure(api_key=api_key)
        
    def generate_recommendations(self, user_input):
        prompt = f"""
        Act as a skill to pathway advisor. 
        User's skills: {user_input} Based on the users skills experience location and income goal suggest job opportunities or gigs. Provide income ranges where possible. keep it concise.
        expected output format : "job description :
                                    required experience : 
                                    skills : 
                                    salary : 

        """
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)

        return response.result.strip()

    def suggest_income_pathways(self, skill, experience_level, location, income_goal):

        user_input = f"Skill: {skill}, Experience Level: {experience_level}, Location: {location}, Income Goal: {income_goal}"
        
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(user_input)
        pathway = response.text.strip()
        return pathway


def get_user_input():
    skill = input("Enter your skill (e.g., Digital Marketing, Software Development): ").strip()
    experience_level = input("Enter your experience level (beginner, intermediate, expert): ").strip()
    location = input("Enter your location: ").strip()
    income_goal = input("Enter your income goal (e.g., 12LPA): ").strip()
    
    return skill, experience_level, location, income_goal


advisor = IncomePathwayAdvisor(api_key="AIzaSyA8DBdo1xImKlkjziL_AFjm01PDMOR4rU0")
skill, experience_level, location, income_goal = get_user_input()
    
recommendations = advisor.suggest_income_pathways(skill, experience_level, location, income_goal)
    
print("\nSuggested Income Pathways:")
print(recommendations)


