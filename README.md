[![CI](https://github.com/axelrindle/docker-registry-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/axelrindle/docker-registry-frontend/actions/workflows/ci.yml)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/214110a7990a49d1872f468a1b750797)](https://www.codacy.com/gh/axelrindle/docker-registry-frontend/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=axelrindle/docker-registry-frontend&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/214110a7990a49d1872f468a1b750797)](https://www.codacy.com/gh/axelrindle/docker-registry-frontend/dashboard?utm_source=github.com&utm_medium=referral&utm_content=axelrindle/docker-registry-frontend&utm_campaign=Badge_Coverage)
[![DockerHub Badge](https://img.shields.io/docker/v/axelrindle/docker-registry-frontend?color=%232392e6&logo=docker&logoColor=%232392e6)](https://hub.docker.com/r/axelrindle/docker-registry-frontend)

# docker-registry-frontend

> :whale: A custom frontend for a selfhosted Docker registry.

## Deployment

The directory [docker/example](docker/example) contains example configuration for Docker Compose.

### Docker Image

```shell
docker pull axelrindle/docker-registry-frontend:<VERSION>
```

Replace `<VERSION>` with `latest` or any available release tag.

### Configuration

Configuration is done via environment variables.

#### REACT_APP_REGISTRY_API_URL

**Required**

Specifies the registry endpoint to use.

```properties
REACT_APP_REGISTRY_API_URL=http://localhost:5000
```

### Volumes

All application data will be stored inside the container at `/data`. Mount a volume at that point to persist that data.

### Ports

The container exposes two ports:

- `80` for HTTP

- `443` for HTTPS (see below)

### HTTPS Connection

By default, a custom certificate is generated if none is found inside the data directory.

To use your own certificate, mount it & it's key onto the following files inside the container:

- **Certificate**: `/data/ssl/server.crt`

- **Key**: `/data/ssl/server.key`

## Development

1. Configure the application using a `.env` file.
2. `npm install`
3. `npm start`
4. Navigate to `http://localhost:3000`

## License

[MIT](LICENSE)

## Copyright Notices

- [src/Moby-logo.png](src/Moby-logo.png) - [Docker Inc.](https://www.docker.com/company/newsroom/media-resources/)
