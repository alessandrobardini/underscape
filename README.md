
![underscape](https://github.com/user-attachments/assets/17663fdb-321e-43bc-b703-ab463bd37ef5)

Are you brave enough to solve the riddles and win the game? 🎲 🎮

Online escape room inspired by the videogame [Undertale](https://undertale.com/).

Meet weird friends...
<img width="1095" alt="image" src="https://github.com/user-attachments/assets/11ead262-f5de-409b-a9a5-81fb000e7132">
... and overcome crazy challenges!
https://github.com/user-attachments/assets/3ea7318a-6cd4-47f5-bf85-34e97ee24e95






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
