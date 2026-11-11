@echo off
title Stop AVH Server
echo ==========================================================================
echo   AUGUSTA VICTORIA HOSPITAL - STAFF OCCUPATIONAL HEALTH SYSTEM
echo ==========================================================================
echo Stopping background server & watchdog on port 8085...
powershell -ExecutionPolicy Bypass -NoProfile -Command "Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like '*server_watchdog.ps1*' -or $_.CommandLine -like '*serve.ps1*8085*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }"
powershell -ExecutionPolicy Bypass -NoProfile -Command "Get-NetTCPConnection -LocalPort 8085 -ErrorAction SilentlyContinue | ForEach-Object { if ($_.OwningProcess -gt 4) { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue } }"
echo Server & watchdog stopped successfully.
timeout /t 2 >nul
