import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import matplotlib.pyplot as plt
import joblib

def main():
    # 1. Load dataset (CSV)
    print("Loading dataset...")
    df = pd.read_csv('Student_Performance.csv')

    # 2. Preprocessing
    df.rename(columns={
        'Hours Studied': 'hours_studied',
        'Previous Scores': 'previous_scores',
        'Extracurricular Activities': 'extracurricular_activities',
        'Sleep Hours': 'sleep_hours',
        'Sample Question Papers Practiced': 'practice_papers',
        'Performance Index': 'performance_index'
    }, inplace=True)

    df['extracurricular_activities'] = df['extracurricular_activities'].map({'Yes': 1, 'No': 0})

    # Separate features and target
    X = df[['hours_studied', 'previous_scores', 'sleep_hours', 'extracurricular_activities', 'practice_papers']]
    y = df['performance_index']

    # Apply StandardScaler
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Use train_test_split
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

    # 3. Build ANN regression model
    print("Building ANN...")
    model = Sequential([
        Dense(64, activation='relu', input_shape=(X_train.shape[1],)),
        Dropout(0.2),
        Dense(32, activation='relu'),
        Dense(16, activation='relu'),
        Dense(1, activation='linear')
    ])

    # 4. Compile
    model.compile(optimizer='adam', loss='mean_squared_error', metrics=['mean_absolute_error'])

    # 5. Add EarlyStopping
    early_stopping = EarlyStopping(
        monitor='val_loss', 
        patience=10, 
        restore_best_weights=True
    )

    # 6. Train
    print("Training ANN...")
    history = model.fit(
        X_train, y_train,
        epochs=100,
        batch_size=16,
        validation_split=0.2,
        callbacks=[early_stopping],
        verbose=1
    )

    # 7. Evaluate
    print("\nEvaluating ANN on test set...")
    y_pred_ann = model.predict(X_test)
    ann_mae = mean_absolute_error(y_test, y_pred_ann)
    ann_mse = mean_squared_error(y_test, y_pred_ann)
    ann_r2 = r2_score(y_test, y_pred_ann)
    
    print(f"ANN => MAE: {ann_mae:.4f}, MSE: {ann_mse:.4f}, R²: {ann_r2:.4f}")

    # Plot training vs validation loss
    plt.figure(figsize=(10, 5))
    plt.plot(history.history['loss'], label='Training Loss')
    plt.plot(history.history['val_loss'], label='Validation Loss')
    plt.title('Model Loss (MSE)')
    plt.ylabel('Loss')
    plt.xlabel('Epoch')
    plt.legend(loc='upper right')
    plt.savefig('loss_plot.png')
    print("Saved training plot to loss_plot.png")

    # 8. Compare models
    print("\nTraining Linear Regression...")
    lr_model = LinearRegression()
    lr_model.fit(X_train, y_train)
    y_pred_lr = lr_model.predict(X_test)
    print(f"Linear Regression => MAE: {mean_absolute_error(y_test, y_pred_lr):.4f}, "
          f"MSE: {mean_squared_error(y_test, y_pred_lr):.4f}, R²: {r2_score(y_test, y_pred_lr):.4f}")

    print("\nTraining Decision Tree Regressor...")
    dt_model = DecisionTreeRegressor(random_state=42)
    dt_model.fit(X_train, y_train)
    y_pred_dt = dt_model.predict(X_test)
    print(f"Decision Tree => MAE: {mean_absolute_error(y_test, y_pred_dt):.4f}, "
          f"MSE: {mean_squared_error(y_test, y_pred_dt):.4f}, R²: {r2_score(y_test, y_pred_dt):.4f}")

    # 9. Save
    model.save('model.h5')
    joblib.dump(scaler, 'scaler.pkl')
    print("\nSaved model.h5 and scaler.pkl successfully.")

if __name__ == '__main__':
    main()