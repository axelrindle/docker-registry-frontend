FROM node:16-alpine as build

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build


FROM nginx:stable-alpine

ENV APP_DIRECTORY="/usr/share/nginx/html"
ENV APP_DIRECTORY_SSL="/data/ssl"

RUN apk add --no-cache jo openssl

# install nginx configs
# site.conf.d is used to place common configuration for 80 & 443
# conf.d is used for global configuration
RUN mkdir /etc/nginx/site.conf.d/
COPY docker/nginx/site.conf.d/* /etc/nginx/site.conf.d/
COPY docker/nginx/conf.d/* /etc/nginx/conf.d/
COPY docker/nginx/templates/* /etc/nginx/templates/

# copy the previously built static files
WORKDIR ${APP_DIRECTORY}
COPY --from=build /app/build .

RUN mkdir /data \
    && mkdir ${APP_DIRECTORY_SSL}
COPY docker/certs/* ${APP_DIRECTORY_SSL}
VOLUME /data

EXPOSE 80
EXPOSE 443

COPY docker/entrypoints/* /docker-entrypoint.d
