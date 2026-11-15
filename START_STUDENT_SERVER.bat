@echo off
title IPC Puzzle - Local Student Wi-Fi Server
color 0b
echo ========================================================
echo   IPC TRAINING PUZZLE - LOCAL STUDENT SERVER LAUNCHER
echo ========================================================
echo.
echo Starting local web server with Remote State Sync for students on the same Wi-Fi...
echo.

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"

pause
