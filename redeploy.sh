#!/bin/bash
# ignore this file - this is for audstanley's server only
git pull;
docker stop coffeeorders_coffeeorders_1 \
        && docker rm coffeeorders_coffeeorders_1 \
        && docker rmi coffeeorders_coffeeorders \
        && docker-compose up -d;
