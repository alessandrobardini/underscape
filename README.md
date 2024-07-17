# Undertale online escape room

Repository for an online company event: teams are required to play an online escape room and solve the riddles to win the game! 🎲 🎮

## Local game

### Setup
Make sure you have all the dependencies installed:
- a recent Ruby version. It is recommended to use the version indicated in the `Gemfile`/`.ruby-version`
- the `bundler` ruby gem
- the `yarn` package manager for Javascript
- The Postgres database

Then:
- run `bundle install` to install all needed gems
- run `yarn install` to install all Javascript packages
- run `bin/rake db:create && bin/rake db:migrate` to create and migrate the database

### How to play
Once the setup is done:
- Within one terminal, start rails server: `bin/rails server`
- Within another terminal, start webpack dev server: `bin/webpack-dev-server`
- Open a browser and go to `localhost:3000/app`
- Have fun!
