@echo off
title Warung Online Server
:: Masuk ke folder tempat file ini berada
cd /d "%~dp0"

echo --------------------------------------------------
echo       MENCUBA MENJALANKAN WARUNG ONLINE
echo --------------------------------------------------
echo.

:: 1. Cek Folder node_modules
if not exist node_modules (
    echo [INFO] Folder node_modules tidak ada. Menginstall dulu...
    echo [INFO] Mohon tunggu, ini hanya sekali saja.
    echo.
    call npm install
)

:: 2. Jalankan Server
echo.
echo [INFO] Menjalankan Vite Dev Server...
echo [INFO] Tekan CTRL+C untuk berhenti.
echo.

call npm run dev

:: 3. Jika server berhenti (karena error atau dihentikan)
echo.
echo --------------------------------------------------
echo [INFO] Server telah terhenti.
echo Jika ada pesan error di atas, silakan dibaca.
echo --------------------------------------------------
pause
