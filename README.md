Super quick remake of old whattoeat with less dependencies. Converted from gatsby in an hour.
.env file with APIKEY=yelp apikey here

Steps to deploy:
1. cd frontend
2. npm run build
3. cd backend
4. pm2 restart --name whattoeat app.js

Set Apache proxy to localhost:3334

Express servers React directly from frontend build and api in the same server. Apache only as proxy.

Previously two domains for backend and frontend using apache + node.

Add apache proxies:

# Docker backend
<Location /api>
ProxyPass http://localhost:3335
ProxyPassReverse http://localhost:3335
</Location>

# Docker frontend
<Location />
ProxyPass http://localhost:3336/
ProxyPassReverse http://localhost:3336/
</Location>

Deploy with docker

Docker commands:
docker-compose -f docker-compose.prod.yml up -d --build
docker-compose -f docker-compose.prod.yml down

Restart nginx
nginx -s reload

Alpine add nano:
apk add nano

Log to container
docker exec -it ID sh

What did I learn?

Apache nginx combo requires dual proxy. One for apache and one for nginx. Otherwise nginx serves static content