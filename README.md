# Test Dev Asksuite

## How to run
To run this project, you'll need:

1) Docker installed in your PC.

    OR

2) Node 18+ and npm installed in your PC.

**With docker:**

After ensuring you have Docker properly installed, navigate to the source directory of this repository and run `docker-compose up`.

Then, wait for the container to start.

Once the container has started, you can begin using the endpoint http://localhost:9090/search.

**With Node.js, locally:**

You'll need to install Node.js version 18 or higher, and install npm.

After that, go to the source directory of this repository and run `npm install`, then wait for the process to finish.

Then, you can run `npm run start`. Once the server has started, you can begin using the endpoint http://localhost:9090/search.

To view the API documentation, you can access:

* http://localhost:9090/docs (Redoc with Swagger)

* http://localhost:9090/api-docs (Swagger)

## Tests

You can run tests locally by running the command (ensure you've followed step 2 of "How to run" before this):

`npm run test:e2e`
