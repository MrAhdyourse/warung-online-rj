@echo off
setlocal enabledelayedexpansion

REM Change to script directory
cd /d "%~dp0"

echo ============================================
echo   BUILD + PUSH to GitHub
echo ============================================
echo.
echo [INFO] Working directory: %cd%
echo.

REM Check if node_modules exists and should be ignored
if exist node_modules (
    echo [INFO] node_modules detected - will be excluded from git
)

REM Build project
echo [STEP 1] Building project...
call npm run build
if !errorlevel! neq 0 (
    echo [ERROR] Build failed! Aborting...
    pause
    exit /b 1
)
echo [SUCCESS] Build completed!
echo.

REM Initialize git if needed
if not exist .git (
    echo [STEP 2] Initializing git repository...
    git init
)

REM Add remote origin if not exists
git remote | findstr "origin" >nul
if !errorlevel! neq 0 (
    echo [STEP 3] Adding remote origin...
    git remote add origin https://github.com/MrAhdyourse/warung-online-rj.git
) else (
    echo [STEP 3] Remote origin already exists
)

REM Stage all files (excluding node_modules via .gitignore)
echo [STEP 4] Staging files...
git add .
echo.

REM Check if there are changes to commit
git diff --cached --quiet
if !errorlevel! neq 0 (
    echo [STEP 5] Committing changes...
    git commit -m "Build and deploy: Update project"
    echo [SUCCESS] Changes committed!
) else (
    echo [INFO] No changes to commit
)

REM Push to GitHub
echo [STEP 6] Pushing to GitHub...
git branch -M main
git push -u origin main
if !errorlevel! neq 0 (
    echo [WARNING] Push failed. You may need to:
    echo   1. Check your GitHub credentials
    echo   2. Ensure the repository exists on GitHub
    echo   3. Run: git config --global user.email "your@email.com"
    echo   4. Run: git config --global user.name "Your Name"
    pause
    exit /b 1
)
echo.
echo ============================================
echo   PUSH COMPLETED SUCCESSFULLY!
echo ============================================
echo Repository: https://github.com/MrAhdyourse/warung-online-rj
echo Website: https://mrahdyourse.github.io/warung-online-rj
echo.
pause
