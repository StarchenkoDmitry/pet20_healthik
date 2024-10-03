# Healthik

## Running Docker services

1. Before building you need to configure `.env` file by following the example `.env.example` file.

2. Build. Before launching the services, you need to build images.
   `docker compose build`

3. Run.
   `docker compose up`

- Alternative startup services.
    Make the first step from the list above and run `docker compose up --build`, that will rebuild and run the services.
