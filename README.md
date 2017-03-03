# kuejs-poc

To start the PoC you need to:

1. start a Redis DB via docker-compose:

```shell-script
docker-compose up -d redis
```
Kue.js depends on a Redis database by default.

2. run npm commands:

```shell-script
npm install
npm start
```

You can use your browser to "GET localhost:3000" navigating to http://localhost:3000. It is going to create job that a worker will process.

Check kue.js UI in http://localhost:3001 to view all jobs statuses.

To stop this Poc, run:

1. `^CTRL+C` in your terminal to kill the app.js

2. Stop Redis:

```shell-script
docker-compose stop redis
```
