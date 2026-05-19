Super quick remake of old whattoeat with less dependencies. Converted from gatsby in an hour.
.env file with GOOGLE_API=google places api key here

## Docker commands

Docker commands:
docker-compose -f docker-compose.prod.yml up -d --build
docker-compose -f docker-compose.prod.yml down

Restart nginx
nginx -s reload

Alpine add nano:
apk add nano

Log to container
docker exec -it ID sh

# How project is built?

- Frontend is using React + Typescript. Typescript is postinstalled to understand how they link in real project and without typescript flag in CRA
- Frontend has eslint + prettier working in sync
- Frontend has two docker files, one for development and one for static nginx

- Backend is using nodejs + express. Typescript is also post installed.
- Backend typescript has live watcher for dev mode
- Backend typescript is compiled and also built for production differently
- Backend has eslint and prettier configured
