#!/bin/bash
if ! [ -f docker-compose.yml ]; then
  echo -e "web:\n  image: justkant/ilovemycity-api:0.1.9\n  ports:\n    - \"3030:3030\"\n  links:\n    - \"rdb:webdb\"\n  environment:\n    - DOCKER_HOST=\${DOCKER_HOST}\n\nrdb:\n  image: rethinkdb:2.3\n  volumes_from:\n    - data\n\ndata:\n  image: tianon/true\n  volumes:\n    - /data" >> docker-compose.yml
fi
docker-compose build && docker-compose up
