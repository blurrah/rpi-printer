FROM resin/rpi-raspbian:jessie

MAINTAINER Boris Besemer

RUN groupadd -r node \
    && useradd -r -g node node

RUN mkdir /var/node/rpi-printer \
    && chown -R node:node /var/node \
    && su node \
    && git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout v0.31.0 \
    && echo 'source ~/.nvm/nvm.sh' > ~/.bashrc && source ~/.nvm/nvm.sh \
    && nvm install v6.1.0 \
    && nvm use v6.1.0


USER node

COPY . /var/node/rpi-printer

WORKDIR /var/node/rpi-printer

EXPOSE 3000

CMD ["npm run start"]
