FROM node:16-alpine as build

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build


FROM nginx:stable-alpine

# install nginx configs
# site.conf.d is used to place common configuration for 80 & 443
# conf.d is used for global configuration
RUN mkdir /etc/nginx/site.conf.d/
COPY docker/nginx/site.conf.d/*.conf /etc/nginx/site.conf.d/
COPY docker/nginx/conf.d/*.conf /etc/nginx/conf.d/

# install custom ssl certificates
# they should be overwritten in production
RUN mkdir /etc/ssl/app
COPY docker/server.* /etc/ssl/app

# copy the previously built static files
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .

COPY docker/env.sh .env.sh
RUN apk add --no-cache jo

EXPOSE 80
EXPOSE 443
CMD ./.env.sh && nginx -g "daemon off;"
