@echo off
REM GreetFlow Quick Start Script for Windows

echo 🚀 Starting GreetFlow Application...
echo.

REM Create MongoDB data directory if it doesn't exist
if not exist "C:\data\db" (
    echo 📁 Creating MongoDB data directory...
    mkdir "C:\data\db"
    echo ✅ Directory created
)

REM Check if MongoDB is running
echo 📦 Checking MongoDB...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="1" (
    echo ⚠️  MongoDB is not running. Starting MongoDB...
    start "MongoDB" mongod
    timeout /t 3 /nobreak >nul
    echo ✅ MongoDB started
) else (
    echo ✅ MongoDB is already running
)
echo.

REM Seed database if needed
echo 🌱 Checking database...
cd server
if not exist ".seeded" (
    echo 📝 Seeding database with sample templates...
    call npm run seed
    echo. > .seeded
    echo ✅ Database seeded
) else (
    echo ✅ Database already seeded
)
echo.

REM Start backend
echo 🔧 Starting backend server...
start "GreetFlow Backend" cmd /k "npm start"
echo ✅ Backend started
echo.

REM Wait for backend to be ready
timeout /t 3 /nobreak >nul

REM Start frontend
echo 🎨 Starting frontend...
cd ..\client
start "GreetFlow Frontend" cmd /k "npm run dev"
echo ✅ Frontend started
echo.

echo ✨ GreetFlow is now running!
echo    Backend: http://localhost:5000
echo    Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause >nul
