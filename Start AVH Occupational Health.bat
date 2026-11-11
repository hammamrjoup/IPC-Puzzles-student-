@echo off
title "AVH Staff Occupational Health System"
cd /d "%~dp0avh-occupational-health-standalone"
echo ==========================================================================
echo   AUGUSTA VICTORIA HOSPITAL - STAFF OCCUPATIONAL HEALTH SYSTEM
echo ==========================================================================
echo Starting server on http://localhost:8085/ ...
start "" "http://localhost:8085/"
powershell -ExecutionPolicy Bypass -NoProfile -File .\serve.ps1 -Port 8085
pause
