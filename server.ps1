$port = 8080
$root = $PSScriptRoot
if (-not $root) { $root = Get-Location }

# Find local Wi-Fi IPv4 address
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike '*Loopback*' -and $_.IPAddress -notlike '169.254*' } | Select-Object -First 1).IPAddress
if (-not $ip) { $ip = '127.0.0.1' }

# Start TCP Listener
$listener = New-Object System.Net.Sockets.TcpListener ([System.Net.IPAddress]::Any, $port)
try {
    $listener.Start()
} catch {
    Write-Host 'Port 8080 is busy, trying 8085...' -ForegroundColor Yellow
    $port = 8085
    $listener = New-Object System.Net.Sockets.TcpListener ([System.Net.IPAddress]::Any, $port)
    $listener.Start()
}

Write-Host '========================================================' -ForegroundColor Cyan
Write-Host '  SERVER ACTIVE - READY FOR SMARTPHONE SCANNING!' -ForegroundColor Green
Write-Host '========================================================' -ForegroundColor Cyan
Write-Host ("  Trainer / Screen:   http://localhost:$port/index.html?view=portal") -ForegroundColor Yellow
Write-Host ("  Student Phone URL:  http://" + $ip + ":" + $port + "/index.html?mode=student&view=portal") -ForegroundColor White
Write-Host '--------------------------------------------------------'
Write-Host 'Students connected to the same Wi-Fi can now scan QR code!' -ForegroundColor Green
Write-Host 'Keep this window OPEN while running your training class.' -ForegroundColor Gray
Write-Host 'Press Ctrl+C to close server when finished.' -ForegroundColor Gray
Write-Host '========================================================' -ForegroundColor Cyan

# Launch All-Puzzles Portal directly in default browser for Trainer / Wall Touch Screen
Start-Process "http://localhost:$port/index.html?view=portal"

# State storage for live Wi-Fi sync
$sessionState = '{"isPaused":false,"stage":1,"timeRemaining":240,"status":"stopped"}'

$mimeTypes = @{
    '.html' = 'text/html; charset=utf-8'
    '.htm'  = 'text/html; charset=utf-8'
    '.js'   = 'application/javascript; charset=utf-8'
    '.css'  = 'text/css; charset=utf-8'
    '.json' = 'application/json; charset=utf-8'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.jpeg' = 'image/jpeg'
    '.svg'  = 'image/svg+xml'
    '.ico'  = 'image/x-icon'
}

while ($listener.Server.IsBound) {
    try {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $writer = New-Object System.IO.BinaryWriter($stream)

        $requestLine = $reader.ReadLine()
        if (-not $requestLine) { $client.Close(); continue }

        $headers = @{}
        while ($line = $reader.ReadLine()) {
            if ($line -eq '') { break }
            $parts = $line.Split(':', 2)
            if ($parts.Length -eq 2) {
                $headers[$parts[0].Trim().ToLower()] = $parts[1].Trim()
            }
        }

        $tokens = $requestLine.Split(' ')
        $method = $tokens[0]
        $rawUrl = $tokens[1]
        $path = $rawUrl.Split('?')[0]

        # API endpoint for live session state sync
        if ($path -eq '/api/session') {
            if ($method -eq 'POST') {
                $cLen = 0
                if ($headers.ContainsKey('content-length')) {
                    [int]::TryParse($headers['content-length'], [ref]$cLen) | Out-Null
                }
                if ($cLen -gt 0) {
                    $buf = New-Object char[] $cLen
                    $read = $reader.ReadBlock($buf, 0, $cLen)
                    $sessionState = New-Object string ($buf, 0, $read)
                }
            }
            $respBytes = [System.Text.Encoding]::UTF8.GetBytes($sessionState)
            $hdr = "HTTP/1.1 200 OK`r`nContent-Type: application/json; charset=utf-8`r`nContent-Length: " + $respBytes.Length + "`r`nAccess-Control-Allow-Origin: *`r`nAccess-Control-Allow-Methods: GET, POST, OPTIONS`r`nAccess-Control-Allow-Headers: *`r`nConnection: close`r`n`r`n"
            $hdrBytes = [System.Text.Encoding]::UTF8.GetBytes($hdr)
            $writer.Write($hdrBytes)
            if ($method -ne 'OPTIONS') { $writer.Write($respBytes) }
            $writer.Flush()
            $client.Close()
            continue
        }

        # Static file handling
        if ($path -eq '/' -or $path -eq '') { $path = '/index.html' }
        $path = [System.Uri]::UnescapeDataString($path).TrimStart('/')
        $fullPath = Join-Path $root $path

        if (Test-Path $fullPath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { 'application/octet-stream' }
            $bytes = [System.IO.File]::ReadAllBytes($fullPath)
            $hdr = "HTTP/1.1 200 OK`r`nContent-Type: $mime`r`nContent-Length: " + $bytes.Length + "`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
            $hdrBytes = [System.Text.Encoding]::UTF8.GetBytes($hdr)
            $writer.Write($hdrBytes)
            $writer.Write($bytes)
            $writer.Flush()
        } else {
            $msg = '404 Not Found'
            $b = [System.Text.Encoding]::UTF8.GetBytes($msg)
            $hdr = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain`r`nContent-Length: " + $b.Length + "`r`nConnection: close`r`n`r`n"
            $hdrBytes = [System.Text.Encoding]::UTF8.GetBytes($hdr)
            $writer.Write($hdrBytes)
            $writer.Write($b)
            $writer.Flush()
        }
        $client.Close()
    } catch { }
}
