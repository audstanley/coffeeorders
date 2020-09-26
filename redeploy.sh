#!/bin/bash
git pull;
docker stop coffeeorders_coffeeorders_1 \
        && docker rm coffeeorders_coffeeorders_1 \
        && docker rmi coffeeorders_coffeeorders \
        && docker-compose up -d;
