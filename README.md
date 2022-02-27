# Library app

Small library app for an interview process.

## Install & Commands

The following commands should be executed from the root folder:

### Install

- `cd front && npm install` Install the front Angular app
- `cd back/users && npm install` Install the users microservice (backend)
- `cd back/books && npm install` Install the books microservice (backend)
- `cd back/gateway && npm install` Install the gateway (backend)

### Start locally

- `npm run docker:back` Start the Redis and Mongodb instances using docker-compose
- `cd front && npm run start:dev` Start the front app in developer mode (default port: 4201)
- `cd back/users && npm run start:dev` Start the users microservice in developer mode
- `cd back/books && npm run start:dev` Start the books microservice in developer mode
- `cd back/gateway && npm run start:dev` Start the gateway in developer mode (default port: 3000)

### Start using Docker

The docker-compose files for the backend microservices and the front Angular app are not fully working (connection issues with WSL setup, front and some microservices don't connect to Mongo/Redis at start).

- `npm run docker:back` Launches Mongo and Redis containers (other services commented out)
- `npm run docker:front` Launches the Angular app in a container to run on `http://localhost` (port:80 exposed by nginx)

## Architecture

- Base Angular app for the front using [Angular CLI](https://github.com/angular/angular-cli) for a quick start
- Base NestJs app for the back using NestJs [Mongoose sample](https://github.com/nestjs/nest/tree/master/sample/14-mongoose-base) and [Queues sample](https://github.com/nestjs/nest/tree/master/sample/26-queues) from GitHub as a guideline as I've never used NestJs

### Frontend

The front is an Angular app that connects to the NestJs backend using HTTP calls. All routes are public to make it simpler.

### Backend

The backend is a NestJs app with a gateway (listening for HTTP calls and exposing a REST API) that communicates with the micro-services (users/books) to retrieve or update data from the database. The communications use Redis as the transport protocol (the gateway and the microservices emit events in Redis and they can listen to those events to trigger handlers).

All routes are public to make it simpler. If we had more time, the routes could be protected by Guards on the backend side with some ACL depending on an authenticated user making a request from the front app (e.g. with a JWT token + some JWT auth session management on the backend).

### Data model

- BookReference: // Represents a reference that exist in the library

  - \_id: ObjectId (mongodb id)
  - author: string
  - title: string
  - excerpt: string
  - status: AVAILABLE / UNAVAILABLE / TO_ORDER_BACK
  - available: number (0+) // To keep track of the available books without having to query everything
  - totalQuantity: number (0+)

- Books: // Represents a real book the library owns

  - \_id: ObjectId (mongodb id)
  - reference: \_id: ObjectId (reference to the BookReference \_id field)
  - status: AVAILABLE / BORROWED / IN_TRANSIT / TO_BE_PICKED / DAMAGED / LOST
  - owner: ObjectId (reference to the User id field, nullable if not borrowed)

- Users: // Represents a user from the library

  - \_id: ObjectId (mongodb id)
  - firstName: string
  - lastName: string
  - books: ObjectId[] (array of ids to keep track of all the users borrowed books)
