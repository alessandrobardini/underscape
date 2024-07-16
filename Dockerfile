# syntax=docker/dockerfile:1.0.0-experimental

FROM ruby:3.3.1

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y \
    build-essential \
    libpq-dev \
    nodejs \
    postgresql-client \
    yarn \
    openssh-client

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/

ARG MASTER_KEY
ENV RAILS_MASTER_KEY=${MASTER_KEY}
ENV RAILS_ENV production
ENV RACK_ENV production
ENV RAILS_SERVE_STATIC_FILES true
ENV RAILS_LOG_TO_STDOUT true
ENV WEBAPP_REVISION $REVISION

RUN gem install bundler -v 2.3.7 && \
    bundle config --global frozen 1 && \
    bundle config set without 'development test' && \
    bundle install

RUN yarn install

RUN bundle exec rake assets:precompile

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]

