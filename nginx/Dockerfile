FROM nginx:alpine

WORKDIR /opt

RUN apk add --no-cache gettext

COPY auth.conf auth.htpasswd launch.sh ./


RUN ["chmod", "+x", "./launch.sh"]
CMD ["./launch.sh"]