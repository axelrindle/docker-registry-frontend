#!/bin/bash

TAG="${TAG:-docker-registry-frontend:latest}"

docker buildx build \
    --push \
    --platform linux/arm64/v8,linux/amd64 \
    -t $TAG \
    -f docker/Dockerfile \
    .
