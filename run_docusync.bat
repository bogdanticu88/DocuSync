@echo off
setlocal

:: Get the full path of the project root
set PROJECT_ROOT=%~dp0
set VENV_PATH=%PROJECT_ROOT%..\auto-diagrammer\backend\venv\Scripts\python.exe

echo [DocuSync Launcher] Starting Services...
echo.

:: Start Backend
echo [*] Starting Backend (FastAPI) on Port 8000...
start "DocuSync Backend" cmd /k "cd %PROJECT_ROOT%backend && %VENV_PATH% -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

:: Start Frontend
echo [*] Starting Frontend (Next.js) on Port 3000...
start "DocuSync Frontend" cmd /k "cd %PROJECT_ROOT%frontend && npm run dev"

echo.
echo [SUCCESS] Both services are starting in separate windows.
echo [Frontend] http://localhost:3000
echo [Backend] http://localhost:8000/docs
echo.
pause
