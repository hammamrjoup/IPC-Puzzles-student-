param([int]$Port = 8085, [switch]$NoBrowser)
$ErrorActionPreference = 'Stop'
$workingDir = Join-Path $PSScriptRoot 'avh-occupational-health-standalone'
$url = "http://localhost:$Port/"
function Test-AvhServer {
    try {
        $r = Invoke-WebRequest -Uri ($url + 'api/auth/session') -UseBasicParsing -TimeoutSec 2
        return ($r.StatusCode -eq 200)
    } catch {
        if ($_.Exception.Response -and [int]$_.Exception.Response.StatusCode -eq 401) { return $true }
        return $false
    }
}
if (-not (Test-AvhServer)) {
    $process = Start-Process powershell.exe -WorkingDirectory $workingDir -WindowStyle Hidden -ArgumentList '-ExecutionPolicy', 'Bypass', '-NoProfile', '-WindowStyle', 'Hidden', '-File', '.\serve.ps1', '-Port', "$Port" -RedirectStandardOutput (Join-Path $PSScriptRoot 'serve_output.log') -RedirectStandardError (Join-Path $PSScriptRoot 'serve_error.log') -PassThru
    $ready = $false
    for ($i = 0; $i -lt 60; $i++) {
        Start-Sleep -Milliseconds 500
        if (Test-AvhServer) { $ready = $true; break }
        if ($process.HasExited) { break }
    }
    if (-not $ready) { throw 'AVH server did not start. Check serve_error.log and serve_output.log in the application folder.' }
}
# Ensure watchdog guardian is active
$watchdogScript = Join-Path $workingDir 'server_watchdog.ps1'
if (Test-Path $watchdogScript) {
    try {
        $wProcs = Get-CimInstance Win32_Process -Filter "CommandLine LIKE '%server_watchdog.ps1%'" -ErrorAction SilentlyContinue
        if (-not $wProcs) {
            Start-Process -FilePath 'powershell.exe' -WorkingDirectory $workingDir -ArgumentList '-NoProfile', '-ExecutionPolicy', 'Bypass', '-WindowStyle', 'Hidden', '-File', '.\server_watchdog.ps1' -WindowStyle Hidden
        }
    } catch {}
}
if (-not $NoBrowser) { Start-Process $url }