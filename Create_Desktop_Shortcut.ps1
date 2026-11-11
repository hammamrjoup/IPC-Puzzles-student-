<#
.SYNOPSIS
    Creates or updates the "AVH Occupational Health" Desktop shortcut with a resilient local launcher.
#>
$ErrorActionPreference = "Stop"
$masterDir = $PSScriptRoot
$iconSource = Join-Path $masterDir "avh-occupational-health-standalone\assets\app_icon.ico"

# 1. Setup local resilient launcher directory on C: drive
$localAppDir = [System.IO.Path]::Combine($env:LOCALAPPDATA, "AVH-Launcher")
if (-not (Test-Path $localAppDir)) {
    New-Item -ItemType Directory -Path $localAppDir -Force | Out-Null
}

$localIcon = Join-Path $localAppDir "app_icon.ico"
if (Test-Path $iconSource) {
    Copy-Item $iconSource $localIcon -Force
}

# 2. Deploy local launch_avh.ps1 script
$psScriptContent = @'
Add-Type -AssemblyName System.Windows.Forms -ErrorAction SilentlyContinue

$Port = 8085
$url = "http://localhost:$Port/"

function Test-AvhOnline {
    try {
        $r = Invoke-WebRequest -Uri ($url + "api/auth/session") -UseBasicParsing -TimeoutSec 1
        return ($r.StatusCode -eq 200)
    } catch {
        if ($_.Exception.Response -and [int]$_.Exception.Response.StatusCode -eq 401) { return $true }
        return $false
    }
}

if (Test-AvhOnline) {
    Start-Process $url
    exit 0
}

function Get-MasterDir {
    $primary = "G:\My Drive\Occupational health\Master"
    if (Test-Path (Join-Path $primary "launch_background.ps1")) { return $primary }
    foreach ($drive in (Get-PSDrive -PSProvider FileSystem)) {
        $candidate = Join-Path $drive.Root "My Drive\Occupational health\Master"
        if (Test-Path (Join-Path $candidate "launch_background.ps1")) { return $candidate }
    }
    return $null
}

$gDriveProc = Get-Process -Name "GoogleDriveFS" -ErrorAction SilentlyContinue
if (-not $gDriveProc) {
    $exe = Get-ChildItem "C:\Program Files\Google\Drive File Stream\*\GoogleDriveFS.exe" -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($exe) { Start-Process $exe.FullName -ArgumentList "--startup_mode" -WindowStyle Hidden }
}

$masterDir = Get-MasterDir
$waited = 0
while (-not $masterDir -and $waited -lt 25) {
    Start-Sleep -Seconds 1
    $waited++
    $masterDir = Get-MasterDir
}

if (-not $masterDir) {
    [System.Windows.Forms.MessageBox]::Show(
        "Google Drive is still starting up or the 'Occupational health\Master' folder is not yet mounted on G:.`n`nPlease ensure Google Drive for Desktop is signed in, wait a few seconds, and click the shortcut again.",
        "AVH Occupational Health - Waiting for Google Drive",
        [System.Windows.Forms.MessageBoxButtons]::OK,
        [System.Windows.Forms.MessageBoxIcon]::Warning
    )
    exit 1
}

$launchScript = Join-Path $masterDir "launch_background.ps1"
Start-Process powershell.exe -WorkingDirectory $masterDir -WindowStyle Hidden `
    -ArgumentList "-ExecutionPolicy Bypass -NoProfile -WindowStyle Hidden -File `"$launchScript`" -Port $Port"

for ($i = 0; $i -lt 30; $i++) {
    Start-Sleep -Milliseconds 500
    if (Test-AvhOnline) { break }
}

Start-Process $url
'@

$localPs1 = Join-Path $localAppDir "launch_avh.ps1"
Set-Content -Path $localPs1 -Value $psScriptContent -Encoding UTF8

# 3. Deploy local Launch-AVH.vbs wrapper
$vbsContent = @"
Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
strDir = fso.GetParentFolderName(WScript.ScriptFullName)
psScript = strDir & "\launch_avh.ps1"
command = "powershell.exe -ExecutionPolicy Bypass -NoProfile -WindowStyle Hidden -File """ & psScript & """"
WshShell.Run command, 0, False
"@

$localVbs = Join-Path $localAppDir "Launch-AVH.vbs"
Set-Content -Path $localVbs -Value $vbsContent -Encoding ASCII

# 4. Create Desktop shortcut
$desktopDir = [System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::Desktop)
if (-not (Test-Path $desktopDir)) {
    $desktopDir = Join-Path $env:USERPROFILE "Desktop"
}
$shortcutPath = Join-Path $desktopDir "AVH Occupational Health.lnk"

$wsh = New-Object -ComObject WScript.Shell
$shortcut = $wsh.CreateShortcut($shortcutPath)
$shortcut.TargetPath = "wscript.exe"
$shortcut.Arguments = "`"$localVbs`""
$shortcut.WorkingDirectory = $localAppDir
$shortcut.Description = "Augusta Victoria Hospital - Occupational Health & Vaccination System"
if (Test-Path $localIcon) {
    $shortcut.IconLocation = "$localIcon,0"
}
$shortcut.Save()

Write-Host "==========================================================================" -ForegroundColor Cyan
Write-Host "   AVH OCCUPATIONAL HEALTH - RESILIENT SHORTCUT CREATED" -ForegroundColor Green
Write-Host "==========================================================================" -ForegroundColor Cyan
Write-Host "Launcher Script:  $localVbs"
Write-Host "Desktop Shortcut: $shortcutPath"
Write-Host ""
Write-Host "You can now launch AVH Occupational Health directly from your desktop." -ForegroundColor Green
