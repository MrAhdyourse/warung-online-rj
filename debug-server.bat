@echo off
echo [DIAGNOSTIK] Memulai pengecekan...
echo.

:: Menampilkan lokasi folder saat ini
echo Lokasi Folder: %cd%
echo.

:: Cek Versi Node
echo Memeriksa Node.js...
call node -v
if %errorlevel% neq 0 (
    echo [ERROR] Node.js TIDAK TERDETEKSI. Silakan instal dari nodejs.org
    pause
    exit /b
)

:: Cek Versi NPM
echo Memeriksa NPM...
call npm -v
if %errorlevel% neq 0 (
    echo [ERROR] NPM TIDAK TERDETEKSI.
    pause
    exit /b
)

echo.
echo [INFO] Jika sampai tahap ini tidak tertutup, artinya sistem siap.
echo [INFO] Mencoba menjalankan server (Vite)...
echo.

:: Menjalankan server dengan cmd /k supaya jendela TIDAK BISA menutup sendiri
cmd /k "npm run dev"
