from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os
from textblob import TextBlob
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = Flask(__name__)
# Allow CORS for common local development ports
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001"]}})

# Initialize VADER analyzer
vader_analyzer = SentimentIntensityAnalyzer()

# Load vectorizer and trained model (Fallback/Hybrid)
VECTORIZER_PATH = 'vectorizer.sav'
MODEL_PATH = 'trained_model.sav'

vectorizer = None
model = None

try:
    if os.path.exists(VECTORIZER_PATH):
        with open(VECTORIZER_PATH, 'rb') as f:
            vectorizer = pickle.load(f)
    
    if os.path.exists(MODEL_PATH):
        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)
except Exception as e:
    print(f"Error loading model files: {e}")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({"error": "No text provided"}), 400

        text = data['text'].strip()
        if not text:
            return jsonify({"error": "Empty text"}), 400

        # 1. Advanced NLP Metrics with TextBlob
        blob = TextBlob(text)
        polarity = blob.sentiment.polarity
        subjectivity = blob.sentiment.subjectivity

        # 2. VADER Analysis (Great for Neutral detection)
        vader_scores = vader_analyzer.polarity_scores(text)
        compound = vader_scores['compound']

        # Determine sentiment using a hybrid approach
        if compound >= 0.05:
            result = "Positive 😊"
        elif compound <= -0.05:
            result = "Negative 😡"
        else:
            result = "Neutral 😐"

        # 3. Handle Hybrid Logic if ML model is available
        ml_prediction = None
        if vectorizer and model:
            text_vec = vectorizer.transform([text])
            ml_prediction = int(model.predict(text_vec)[0])

        return jsonify({
            "prediction": result,
            "metrics": {
                "polarity": round(polarity, 2),
                "subjectivity": round(subjectivity, 2),
                "vader_compound": round(compound, 2)
            },
            "ml_model_agreement": (result.startswith("Positive") and ml_prediction == 1) or 
                                 (result.startswith("Negative") and ml_prediction == 0) if ml_prediction is not None else None,
            "status": "success"
        })

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({"error": "Internal Server Error during prediction"}), 500

@app.route('/fetch_live', methods=['POST'])
def fetch_live():
    """Mock Twitter API fetch endpoint to demonstrate capability."""
    try:
        data = request.get_json()
        query = data.get('query', 'AI')
        
        # Simulated live data matching requirement for "Data collection through Twitter's API"
        mock_tweets = [
            {"id": 1, "text": f"Developing new {query} models is so exciting!", "user": "ai_dev"},
            {"id": 2, "text": f"I hate it when {query} fails to understand context.", "user": "angry_user"},
            {"id": 3, "text": f"{query} is a broad field of computer science.", "user": "edu_bot"}
        ]
        
        return jsonify({
            "query": query,
            "count": len(mock_tweets),
            "tweets": mock_tweets,
            "api_status": "Simulated (Standard Tier)"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)