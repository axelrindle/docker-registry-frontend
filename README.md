[![CI](https://github.com/axelrindle/docker-registry-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/axelrindle/docker-registry-frontend/actions/workflows/ci.yml)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/214110a7990a49d1872f468a1b750797)](https://www.codacy.com/gh/axelrindle/docker-registry-frontend/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=axelrindle/docker-registry-frontend&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/214110a7990a49d1872f468a1b750797)](https://www.codacy.com/gh/axelrindle/docker-registry-frontend/dashboard?utm_source=github.com&utm_medium=referral&utm_content=axelrindle/docker-registry-frontend&utm_campaign=Badge_Coverage)

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
