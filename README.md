# Online escape room

Repository for the Magaloop online company event of March 2022: teams are required to play an online escape room and solve the riddles to win the game! 🎲 🎮

URL: https://onlinecompanyevent-2wqlqzukkq-lm.a.run.app/app

## Infrastructure
The website is hosted on Google Cloud and lives inside a Docker container completely handled by [Google Cloud Run](https://cloud.google.com/run).

The production database is PostgreSQL 12.

We resort on [Secret Manager](https://cloud.google.com/secret-manager) to store sensitive secrets (in our case, only the DB password).

## Build & release
The build is handled by [Google Cloud Build](https://cloud.google.com/build), which sequentially builds the Docker image, pushes the Docker image to the [container registry](https://cloud.google.com/container-registry/pricing) and applies the database migrations.

By running `make release`, you can execute the three steps mentioned above.

By running `make deploy`, you can deploy to Google Cloud Run the latest release.
