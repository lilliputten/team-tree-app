#!/bin/sh
# @changed 2025.05.26, 19:35

if [ $# -lt 2 ]; then
  echo "Set telegram bot api url"
  echo "Usage: $0 <BOT_TOKEN> <API_URL> [<BOT_PATH=/api/bot>]"
  exit 1
fi

# Init & get params...
BOT_TOKEN="$1"
API_URL="$2"
BOT_PATH=/api/bot
if [ $# -gt 2 ]; then
  BOT_PATH="$3"
fi

echo "BOT_TOKEN: ${BOT_TOKEN}"
echo "API_URL: ${API_URL}"
echo "BOT_PATH: ${BOT_PATH}"

CMD="curl https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${API_URL}${BOT_PATH}"

echo "Executing command: ${CMD} ..." && \
${CMD}
