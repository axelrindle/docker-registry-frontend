#!/bin/sh

SSL_KEY="$APP_DIRECTORY_SSL/server.key"
SSL_CERT="$APP_DIRECTORY_SSL/server.crt"

# generate SSL key & certificate if no key is mounted
if ! test -f "$SSL_KEY"; then
    echo "Generating a default SSL certificate..."

    mkdir -p "$APP_DIRECTORY_SSL"
    openssl genrsa -out $SSL_KEY 2048
    openssl req -x509 \
        -config "$APP_DIRECTORY_SSL/openssl.conf" \
        -nodes \
        -days 365 \
        -key "$SSL_KEY" \
        -out "$SSL_CERT"

    echo "You should use your own!"
    echo
fi
