@echo off
title Create AVH Occupational Health Desktop Shortcut
powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0Create_Desktop_Shortcut.ps1"
echo.
pause
