#!/bin/sh
# vim: ft=sh
# @desc Config variables (common version -- stored in repository)
# @changed 2024.12.02, 12:54

IS_WINDOWS=`echo "${OS}" | grep -i windows`
IS_CYGWIN=`uname | grep -i "CYGWIN"`

SRC_TAG_PREFIX="v" # "v" for default "v.X.Y.Z"

# TODO: To use generic `init-crossplatform-command-names.sh`?
FINDCMD="find"
SORTCMD="sort"
GREPCMD="grep"
RMCMD="rm"
# # Override posix commands for cygwin or/and windows (may be overrided in `config-local.sh`, see `config-local.sh.TEMPLATE`)...
if [ "$IS_CYGWIN" ]; then
    # Don't use windows' own native commands
    FINDCMD="find_"
    SORTCMD="sort_"
    GREPCMD="grep_"
fi

# Timezone for timestamps (GMT, Europe/Moscow, Asia/Bangkok, Asia/Tashkent, etc)
TIMEZONE="Europe/Moscow"

VERSION_FILE="version.txt"
PROJECT_INFO_FILE="public/app-info.txt"
PROJECT_INFO_JSON_FILE="src/app-info.json"
