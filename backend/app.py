from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)  # Allow CORS for all domains

# Load the trained model from .pkl
try:
    model = joblib.load('/Users/arunaa/ML/Greenhouse-Plant-Growth-Analysis/backend/RF_model.pkl')  # Ensure 'model.pkl' is in the backend folder
except Exception as e:
    model = None
    print("Error loading model:", e)

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500

    try:
        data = request.get_json()
        features = data.get('features')

        if not features or not isinstance(features, list):
            return jsonify({'error': 'Invalid input. Expecting JSON with a list of features.'}), 400

        # Convert input to numpy array and reshape
        input_array = np.array(features).reshape(1, -1)

        prediction = model.predict(input_array)
        return jsonify({'prediction': prediction[0]})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5678)
