import customtkinter as ctk
import numpy as np
import pickle
from tensorflow.keras.models import load_model

# ------------------ SETTINGS ------------------
ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("blue")

# ------------------ LOAD MODEL ------------------
model = load_model("model.h5")

with open("scaler.pkl", "rb") as f:
    sc = pickle.load(f)

# ------------------ PREDICT ------------------
def predict():
    try:
        study_time = float(entry_study.get())
        absences = float(entry_absence.get())
        failures = float(entry_failures.get())
        internet = 1 if internet_var.get() == "yes" else 0

        # -------- VALIDATION --------
        if study_time < 1 or study_time > 4:
            result_label.configure(text="Study Time must be 1–4 ❌", text_color="red")
            return

        if absences < 0 or absences > 30:
            result_label.configure(text="Absences must be 0–30 ❌", text_color="red")
            return

        if failures < 0 or failures > 3:
            result_label.configure(text="Failures must be 0–3 ❌", text_color="red")
            return

        # -------- PREDICTION --------
        input_data = np.array([[study_time, absences, failures, internet]])
        input_scaled = sc.transform(input_data)

        pred = model.predict(input_scaled)
        result = np.argmax(pred)

        result_label.configure(
            text=f"Predicted Grade: {result}",
            text_color="lightgreen"
        )

    except:
        result_label.configure(text="Invalid Input ❌", text_color="red")

# ------------------ APP WINDOW ------------------
app = ctk.CTk()
app.title("Student Performance Predictor")
app.state("zoomed")

# ------------------ MAIN FRAME (RESPONSIVE) ------------------
main_frame = ctk.CTkFrame(app, corner_radius=15)
main_frame.pack(expand=True)

# ------------------ INNER FRAME (CENTER CARD) ------------------
card = ctk.CTkFrame(main_frame, corner_radius=15)
card.pack(expand=True)

# ------------------ TITLE ------------------
title = ctk.CTkLabel(
    card,
    text="🎓 Student Performance Predictor",
    font=("Arial", 26, "bold")
)
title.pack(pady=30)

# ------------------ INPUTS ------------------

ctk.CTkLabel(card, text="Study Time (1–4)").pack(pady=5)
entry_study = ctk.CTkEntry(card, width=350, height=40)
entry_study.pack(pady=5)

ctk.CTkLabel(card, text="Absences (0–30)").pack(pady=5)
entry_absence = ctk.CTkEntry(card, width=350, height=40)
entry_absence.pack(pady=5)

ctk.CTkLabel(card, text="Failures (0–3)").pack(pady=5)
entry_failures = ctk.CTkEntry(card, width=350, height=40)
entry_failures.pack(pady=5)

ctk.CTkLabel(card, text="Internet Access").pack(pady=5)
internet_var = ctk.StringVar(value="yes")
internet_menu = ctk.CTkOptionMenu(
    card,
    values=["yes", "no"],
    variable=internet_var,
    width=200
)
internet_menu.pack(pady=5)

# ------------------ BUTTON ------------------
predict_button = ctk.CTkButton(
    card,
    text="Predict",
    command=predict,
    width=250,
    height=50
)
predict_button.pack(pady=25)

# ------------------ RESULT ------------------
result_label = ctk.CTkLabel(
    card,
    text="",
    font=("Arial", 20, "bold")
)
result_label.pack(pady=20)

# ------------------ RUN ------------------
app.mainloop()