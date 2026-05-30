Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('d:\Workspace\recruitsmart-full\public\homepage-v2\hero-platform.png')
Write-Output ("{0}x{1}" -f $img.Width, $img.Height)
$img.Dispose()
