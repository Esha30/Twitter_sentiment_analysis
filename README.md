# 🐦 Twitter Sentiment Analysis AI

A professional-grade, full-stack application that performs real-time sentiment analysis on Twitter data using a hybrid approach of Machine Learning and Lexicon-based methods.

![Sentiment AI Banner](https://raw.githubusercontent.com/Esha30/Twitter_sentiment_analysis/main/sentiment-frontend/public/banner.png) *(Note: Replace with actual screenshot path if available)*

## 🚀 Features

- **Hybrid Sentiment Engine**: Combines **VADER**, **TextBlob**, and a custom **Logistic Regression ML Model** (trained on 1.6M tweets) for superior accuracy.
- **Real-time Prediction**: Instantaneous classification of text into Positive, Negative, or Neutral categories.
- **NLP Metrics**: Provides detailed scores for Polarity, Subjectivity, and Compound VADER sentiment.
- **Twitter API Simulation**: A dedicated dashboard for fetching and analyzing mock live data.
- **Premium UI**: Modern, glassmorphic dashboard built with Next.js and Tailwind CSS.

## 🛠️ Tech Stack

### Backend
- **Framework**: Flask
- **NLP Libraries**: TextBlob, VADER (vaderSentiment)
- **Machine Learning**: Scikit-learn (Logistic Regression, TF-IDF Vectorization)
- **Language**: Python

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS / Vanilla CSS
- **Interactions**: Framer Motion / CSS Transitions

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/Esha30/Twitter_sentiment_analysis.git
cd Twitter_sentiment_analysis
```

### 2. Setup Backend
```bash
# It is recommended to use a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

pip install -r requirements.txt
python app.py
```

### 3. Setup Frontend
```bash
cd sentiment-frontend
npm install
npm run dev
```

## 🧠 Model Details

The ML model was trained using the **Sentiment140 dataset** (1.6 million tweets).
- **Preprocessing**: Removal of URLs, mentions, and special characters.
- **Vectorization**: TF-IDF (Term Frequency-Inverse Document Frequency).
- **Algorithm**: Logistic Regression.
- **Hybrid Logic**: If the ML model and VADER agree, the confidence is high. VADER is used to capture "Neutral" sentiments which are often missed by binary classifiers.

## 📄 License

This project is open-source and available under the MIT License.

---
Developed by [Esha30](https://github.com/Esha30)
