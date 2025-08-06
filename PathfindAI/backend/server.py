from flask import Flask, jsonify, request
from agent import IncomePathwayAdvisor , generate_recommendations


app = Flask(__name__)

@app.route('/profile', methods=['POST'])
def profile():
    # Get data from the frontend (if needed)
    request_data = request.json  # Example if you want to send extra params to the API
    
    # Run your AI pathfinding logic here
    result = generate_recommendations(request_data)  # Call your pathfinding function

    # Return the result to the frontend
    return jsonify(result)  # Convert the result to JSON and send it back

if __name__ == '__main__':
    app.run(debug=True)