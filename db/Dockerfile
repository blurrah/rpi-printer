FROM resin/rpi-raspbian:jessie

MAINTAINER Boris Besemer

ADD http://facat.github.io/mongodb-2.6.4-arm.7z /tmp/mongodb.7z

RUN apt-get install p7zip -y && 7zr x /tmp/mongodb.7z \
    && mv /tmp/mongodb/bin/* /usr/local/bin && rm -rf /usr/local/bin/mongo && rm -rf /tmp/mongodb \
    && mkdir -p /data/db && rm -rf ~/run-mongodb.sh

ADD run.sh ~/run-mongodb.sh

RUN chmod +x ~/run-mongodb.sh && chmod a+x /usr/local/bin/mongo && apt-get remove p7zip -y

EXPOSE 27017

CMD ["/run-mongodb.sh"]