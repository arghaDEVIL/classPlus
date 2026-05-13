@echo off
REM GreetFlow First-Time Setup Script for Windows

echo ========================================
echo    GreetFlow First-Time Setup
echo ========================================
echo.

REM Create MongoDB data directory
echo 📁 Step 1: Creating MongoDB data directory...
if not exist "C:\data\db" (
    mkdir "C:\data\db"
    echo ✅ Created C:\data\db
) else (
    echo ✅ Directory already exists
)
echo.

REM Check MongoDB installation
echo 📦 Step 2: Checking MongoDB installation...
where mongod >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ MongoDB is not installed or not in PATH
    echo.
    echo Please install MongoDB from:
    echo https://www.mongodb.com/try/download/community
    echo.
    pause
    exit /b 1
)
echo ✅ MongoDB is installed
echo.

REM Start MongoDB
echo 🚀 Step 3: Starting MongoDB...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="1" (
    start "MongoDB Server" mongod
    echo ⏳ Waiting for MongoDB to start...
    timeout /t 5 /nobreak >nul
    echo ✅ MongoDB started
) else (
    echo ✅ MongoDB is already running
)
echo.

REM Install server dependencies
echo 📦 Step 4: Installing server dependencies...
cd server
if not exist "node_modules" (
    echo Installing...
    call npm install
    echo ✅ Server dependencies installed
) else (
    echo ✅ Dependencies already installed
)
echo.

REM Seed database
echo 🌱 Step 5: Seeding database...
if not exist ".seeded" (
    echo Seeding templates...
    call npm run seed
    if %ERRORLEVEL% EQU 0 (
        echo. > .seeded
        echo ✅ Database seeded successfully
    ) else (
        echo ❌ Database seeding failed
        cd ..
        pause
        exit /b 1
    )
) else (
    echo ✅ Database already seeded
)
cd ..
echo.

REM Install client dependencies
echo 📦 Step 6: Installing client dependencies...
cd client
if not exist "node_modules" (
    echo Installing...
    call npm install
    echo ✅ Client dependencies installed
) else (
    echo ✅ Dependencies already installed
)
cd ..
echo.

echo ========================================
echo    ✨ Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Configure Firebase in client/.env (already done ✅)
echo 2. Enable Firebase Authentication providers
echo 3. Enable Firebase Storage
echo 4. Run: start.bat
echo.
echo Or manually start:
echo   Terminal 1: cd server ^&^& npm start
echo   Terminal 2: cd client ^&^& npm run dev
echo.
pause
