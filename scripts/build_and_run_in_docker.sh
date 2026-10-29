#!/usr/bin/env bash

source .env.local

IMAGE=$(node -p "require('./package.json').name")

docker build \
  --build-arg CI_COMMIT_SHORT_SHA="$(git rev-parse --short HEAD)" \
  -f ci-cd-files/Dockerfile \
  -t "$IMAGE" \
  . \
&& \
docker run \
  --rm \
  -p "$PORT_DOCKER":"8080" \
  --env-file .env.local \
  "$IMAGE"
