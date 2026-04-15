import os
import joblib
import numpy as np
from tensorflow.keras.models import load_model

# BASE_DIR is expected to be e:\ANN_DL-main\ANN_DL-main
# __file__ is e:\ANN_DL-main\ANN_DL-main\backend\app\utils.py
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MODEL_PATH = os.path.join(BASE_DIR, 'model.h5')
SCALER_PATH = os.path.join(BASE_DIR, 'scaler.pkl')

model = None
scaler = None

def load_ml_assets():
    global model, scaler
    if model is None:
        model = load_model(MODEL_PATH)
    if scaler is None:
        scaler = joblib.load(SCALER_PATH)

def preprocess_and_predict(data):
    load_ml_assets()

    # The order of features in scaler:
    # 'hours_studied', 'previous_scores', 'sleep_hours', 'extracurricular_activities', 'practice_papers'
    
    hours_studied = float(data.get('hours_studied', 0))
    previous_scores = float(data.get('previous_scores', 0))
    sleep_hours = float(data.get('sleep_hours', 0))
    extracurricular_activities = int(data.get('extracurricular_activities', 0))
    practice_papers = float(data.get('practice_papers', 0))

    features = np.array([[hours_studied, previous_scores, sleep_hours, extracurricular_activities, practice_papers]])
    features_scaled = scaler.transform(features)
    
    pred = model.predict(features_scaled)
    # Clip output between 0 and 100
    score = np.clip(pred[0][0], 0, 100)
    
    if score <= 40:
        performance = "Poor"
    elif score <= 60:
        performance = "Average"
    elif score <= 80:
        performance = "Good"
    else:
        performance = "Excellent"
        
    return float(score), performance
