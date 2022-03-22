#!/bin/sh

DIRECTORY=$(realpath $(dirname $0))

KEY=$DIRECTORY/server.key
CERT=$DIRECTORY/server.crt

openssl genrsa -out $KEY 2048
openssl req -x509 \
    -config $DIRECTORY/openssl.conf \
    -nodes \
    -days 365 \
    -key $KEY \
    -out $CERT
