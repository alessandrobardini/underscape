# Online escape room

Repository for the Magaloop online company event of March 2022: teams are required to play an online escape room and solve the riddles to win the game! 🎲 🎮

## Local game

Steps to set up:

1. Install dependencies: `bundle && yarn`
2. Create & migrate database: `bin/rake db:create && bin/rake db:migrate`
3. Within one terminal, start rails server: `bin/rails server`
4. Within another terminal, start webpack dev server: `bin/webpack-dev-server`
5. Now, you can start the game!

## Online game
The game was previously hosted on GoogleCloud. After the company event, it's no longer hosted anywhere. BUT, you can anyway locally play with your friends!

### Infrastructure
**NB: this section is no longer relevant because the game is not online anymore.**

The website is hosted on Google Cloud and lives inside a Docker container completely handled by [Google Cloud Run](https://cloud.google.com/run).

The production database is PostgreSQL 12.

We resort on [Secret Manager](https://cloud.google.com/secret-manager) to store sensitive secrets (in our case, only the DB password).

### Build & release
**NB: this section is no longer relevant because the game is not online anymore.**

The build is handled by [Google Cloud Build](https://cloud.google.com/build), which sequentially builds the Docker image, pushes the Docker image to the [container registry](https://cloud.google.com/container-registry/pricing) and applies the database migrations.

By running `make release`, you can execute the three steps mentioned above.

By running `make deploy`, you can deploy to Google Cloud Run the latest release.
