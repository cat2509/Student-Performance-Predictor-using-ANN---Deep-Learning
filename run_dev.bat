@echo off
echo Starting the Student Performance Predictor...

echo Starting Django Backend...
start cmd /k "cd backend && python manage.py runserver"

echo Starting React/Vite Frontend...
start cmd /k "cd frontend && npm run dev"

echo Both services have been started in new windows.
