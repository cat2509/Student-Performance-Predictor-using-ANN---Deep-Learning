# 🎓 Student Performance Predictor using ANN (Deep Learning)

## 📌 Overview
This project implements an Artificial Neural Network (ANN) to predict student performance based on input features. It demonstrates how deep learning can be applied to educational data, comparing its performance with traditional machine learning algorithms like Linear Regression and Decision Trees. A modern, dark-themed graphical user interface (GUI) is also provided using `customtkinter`.

## 🚀 Features
- **Deep Learning Model**: Utilizes a multi-layer Artificial Neural Network (ANN) built with TensorFlow/Keras to predict student outcomes.
- **Model Comparison**: Automatically evaluates and compares the ANN's performance against traditional Linear Regression and Decision Tree models using MAE, MSE, and R² scores. 
- **Modern GUI**: Includes an attractive desktop client built with `customtkinter` for simple, user-friendly predictions.
- **Data Preprocessing**: Handles data normalization (`StandardScaler`), train-test splitting, and categorical transformations.
- **Early Stopping**: Prevents model overfitting during training by monitoring validation loss.

## 📂 Project Structure
- `train_model.py`: Script to preprocess data, build, train, and evaluate the ANN model. Saves the trained model (`model.h5`) and scaler (`scaler.pkl`).
- `app.py`: A CustomTkinter-based desktop GUI that allows users to input student parameters and view the predicted performance.
- `Student_Performance.csv`: The dataset containing features influencing student performance.
- `loss_plot.png`: A visual chart plotting training loss versus validation loss (MSE).
- `requirements.txt`: The list of dependencies needed to run the project.

## ⚙️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/cat2509/Student-Performance-Predictor-using-ANN---Deep-Learning.git
   cd Student-Performance-Predictor-using-ANN---Deep-Learning
   ```

2. **Install dependencies:**
   It is recommended to use a virtual environment.
   ```bash
   pip install -r requirements.txt
   ```

## 🛠️ Usage

### 1. Train the Model
You can start by evaluating the algorithms and retraining the ANN model. It will output evaluation metrics to the console and save the model weights and data scaler:
```bash
python train_model.py
```

### 2. Launch the GUI Application
Run the desktop GUI app to enter student parameters and instantly predict their performance:
```bash
python app.py
```

## 📊 Output & Evaluation
- **Metrics Display**: The terminal output shows a performance comparison between ANN, Linear Regression, and Decision Tree regressor models.
- **Visuals**: A training versus validation loss plot (`loss_plot.png`) is automatically saved, allowing you to inspect learning convergence.
- **App Interface**: The standalone GUI processes inputs uniformly using the fitted standard scaler and provides real-time predictions.