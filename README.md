# Event Helsinki GraphQL proxy and client SSR server 

## Development with Docker

To build the project, you will need [Docker](https://www.docker.com/community-edition).

Building the project

    cp .env.example .env
    docker-compose build

Starting the application

    docker-compose up -d

The web application will run on the HOST you set on .env file in your root directory.

GraphQL playground will run on <${HOST}/graphql>

                                                                    | Docker
    http://events-helsinki.docker.localhost           ->  |         | -> UI
                                                          | traefik |
    https://events-helsinki.docker.localhost/graphql  ->  |         | -> GraphQL Proxy
                                                

a single traefik service, that:

1. Handles domain mapping and url routing
2. Provides SSL
3. Can load balances production instances

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
