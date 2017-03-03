# kuejs-poc

*To start the PoC you need to:*

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

*To stop this PoC, run:*

1. `^CTRL+C` in your terminal to kill the app.js

2. Stop Redis:

```shell-script
docker-compose stop redis
```

## Points of attention

1. We are finishing Kue.js gracefully, so we must take care of that in our projects;

2. We can set the `title` parameter of Kue.js to a more meaningfull name using what we receive in the requesting

3. We can avoid exposing Kue.js UI in our apps, it can be made in an instance alone - security measures apply - since it is agnostic to any queue we create it will show all jobs from all queues.
