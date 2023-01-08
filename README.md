# Group uploader project for job application

## Running project

You can run the project in two ways.

### Prod mode

If you run it in "prod" mode, it's one command, but it won't update according to changes made locally to the app. To do this just

1. Run `docker-compose up -d` command

Once the containers are set up, the site should be accessible at the http://localhost:3000/ URL.

You can stop the containers with `docker-compose stop`, and restart it with `docker-compose start`, and then the DB data will remain. Or you can tear it down completely with  `docker-compose down`.

### Dev mode

If you want to do local development, you can use docker to just run the DB. In this case, you need to take the following steps:

1. Run `docker-compose -f docker-compose.just-db.yml up -d` command to start the DB
2. Run `npm i` to install node dependencies
3. Run `npm run dev` to start the Next.js server in development mode

In this mode, any changes to the source files will be immediately reflected on the browser.
