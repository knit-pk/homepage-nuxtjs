FROM node:9-alpine

ARG NODE_ENV=production
ARG API_URL=http://api.knit.pk.edu.pl

ENV HOST 0.0.0.0
ENV NODE_ENV ${NODE_ENV}
ENV API_URL ${API_URL}

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN yarn install && yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
