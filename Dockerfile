FROM node:5.11.0

MAINTAINER Boris Besemer

RUN groupadd -r node \
    && useradd -r -g node node

RUN mkdir /var/node/rpi-printer \
    && chown -R node:node /var/node

USER node

COPY . /var/node/rpi-printer

WORKDIR /var/node/rpi-printer

EXPOSE 3000

CMD ["npm run start"]
