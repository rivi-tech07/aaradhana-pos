#!/bin/zsh

APP_URL="https://aaradhana-pos.vercel.app"

if [[ -d "/Applications/Google Chrome.app" ]]; then
  open -na "Google Chrome" --args --kiosk-printing "${APP_URL}"
elif [[ -d "/Applications/Microsoft Edge.app" ]]; then
  open -na "Microsoft Edge" --args --kiosk-printing "${APP_URL}"
else
  echo "Google Chrome or Microsoft Edge is required for direct printing without the print dialog."
  echo "Opening the app in your default browser instead."
  open "${APP_URL}"
fi
