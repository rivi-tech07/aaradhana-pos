@echo off
set APP_URL=https://aaradhana-pos.vercel.app
set CHROME="C:\Program Files\Google\Chrome\Application\chrome.exe"
set EDGE="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

if exist %CHROME% (
    %CHROME% --kiosk-printing %APP_URL%
) else if exist %EDGE% (
    %EDGE% --kiosk-printing %APP_URL%
) else (
    echo Chrome or Edge required for direct printing without dialog.
    echo Opening in default browser instead.
    start %APP_URL%
    pause
)
