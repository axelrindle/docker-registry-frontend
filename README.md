[![CI](https://github.com/axelrindle/docker-registry-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/axelrindle/docker-registry-frontend/actions/workflows/ci.yml)

# docker-registry-frontend

> :whale: A custom frontend for a selfhosted Docker registry.

## Configuration

Configuration is done via environment variables.

```properties
REACT_APP_REGISTRY_API_URL=http://localhost:5000
```

## Development

1. Configure the application using a `.env` file.
2. `npm install`
3. `npm start`
4. Navigate to `http://localhost:3000`

## License

[MIT](LICENSE)

## Copyright Notices

- [src/Moby-logo.png](src/Moby-logo.png) - [Docker Inc.](https://www.docker.com/company/newsroom/media-resources/)
