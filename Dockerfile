# syntax=docker/dockerfile:1.0.0-experimental

FROM ruby:2.7.5

RUN apt-get update -qq && apt-get install -y \
    build-essential \
    libpq-dev \
    nodejs=16.13.2-deb-1nodesource1 \
    postgresql-client \
    yarn=1.22.4-1 \
    openssh-client

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN gem install bundler -v 2.2.33

COPY Gemfile /usr/src/app/

COPY Gemfile.lock /usr/src/app/

COPY package.json /usr/src/app/

COPY yarn.lock /usr/src/app/

RUN bundle config --global frozen 1

RUN bundle config set without 'development test'

RUN yarn install

RUN rm Gemfile

RUN rm Gemfile.lock

RUN rm package.json

RUN rm yarn.lock

RUN mkdir -p /usr/src/app

ENV RAILS_ENV production

ENV RAILS_SERVE_STATIC_FILES true

ENV RAILS_LOG_TO_STDOUT true

COPY . /usr/src/app/

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]

