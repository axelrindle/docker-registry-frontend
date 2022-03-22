#!/bin/bash

TAG="${TAG:-axelrindle/docker-registry-frontend:latest}"

echo "Building as $TAG"

docker buildx build \
    --push \
    --platform linux/arm/v6,linux/arm/v7,linux/arm64/v8,linux/amd64 \
    -t $TAG \
    -f docker/Dockerfile \
    .
