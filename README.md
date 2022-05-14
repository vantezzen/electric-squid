<img src="components/client/src/logo.png" width="250" height="250" />

# electric-squid

A wrapper and proxy to let [flying-squid](https://github.com/PrismarineJS/flying-squid) run in the browser.

electric-squid-proxy (in components/proxy) creates a light NodeJS proxy Minecraft server that translates game packages into WebSocket packages and sends them to connected WebSocket clients.

electric-squid-frontend (in components/client) creates a wrapper and minimal React frontend to enable [flying-squid](https://github.com/PrismarineJS/flying-squid) to run in the browser instead of on a CLI.

## Progress

electric-squid's functionality is currently very limited:

- [x] Create Proxy Server
- [x] Create basic flying-squid wrapper
- [x] Allow changing version and MOTD
- [ ] Send player positions to other players
- [ ] Send block place/dig to other players
- [ ] Support player disconnect

## Documentation

Documentation is provided in the READMEs contained in the proxy and frontend directories.

## License

This project is licensed under the MIT license.
