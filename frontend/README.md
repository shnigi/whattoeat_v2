Super quick remake of old whattoeat with less dependencies. Converted from gatsby in an hour.
.env file with APIKEY=yelp apikey here

Steps to deploy:
1. cd frontend
2. npm run build
3. cd backend
4. pm2 restart --name whattoeat app.js

Set Apache proxy to localhost:3334

Express servers React directly from frontend build and api in the same server. Apache only as proxy.