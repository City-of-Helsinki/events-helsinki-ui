# Event Helsinki GraphQL proxy and client SSR server 

## Development with Docker

To build the project, you will need [Docker](https://www.docker.com/community-edition).

Building the project

    cp .env.example .env
    docker-compose build

Starting the application

    docker-compose up -d

The web application will run on http://localhost:3000

GraphQL playground will run on http://localhost:4000/proxy/graphql

## Developing locally, outside Docker

Run the graphql proxy
    
    cd graphql-proxy
    cp .env.example .env
    yarn
    yarn start

Run the web frontend
    
    cd client
    cp .env.example .env
    yarn
    yarn start

Run the web frontend on SSR server
    
    cd client
    cp .env.example .env
    yarn
    yarn build
    yarn start:server
