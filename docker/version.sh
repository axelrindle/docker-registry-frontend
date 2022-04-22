#!/bin/bash

# Usage: ./version.sh <event_name> <ref_name> <sha>

EVENT_NAME="$1"
REF_NAME="$2"
SHA="$3"

if [ "$EVENT_NAME" = "push" ]; then
    echo "::set-output name=version::$SHA"
elif [ "$EVENT_NAME" = "tag" ]; then
    echo "::set-output name=version::$REF_NAME"
else
    echo "Invalid event $EVENT_NAME!" >&2
    exit 1
fi
