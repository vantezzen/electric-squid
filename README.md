<img src="components/client/src/logo.png" width="250" height="250" />

# electric-squid

A wrapper and proxy to let [flying-squid](https://github.com/PrismarineJS/flying-squid) run in the browser.

electric-squid consists of two components:

- electric-squid-proxy (in components/proxy) creates a light NodeJS proxy Minecraft server that translates game packages into WebSocket packages and sends them to connected WebSocket clients.
- electric-squid-frontend (in components/client) creates a wrapper and minimal React frontend to enable [flying-squid](https://github.com/PrismarineJS/flying-squid) to run in the browser instead of on a CLI.

![Sequence Diagram](/sequence-diagram.png)

The project is currently still very unstable and doesn't support all features implemented by flying-squid.

## Demo

You can try electric-squid directly at <https://squid.blymp.io/>. Please note that the project currently only targets _the latest chrome version_ so other browsers might not be able to boot the server.

## Progress

electric-squid's functionality is currently very limited:

- [x] Create Proxy Server
- [x] Create basic flying-squid wrapper
- [x] Allow changing version and MOTD
- [x] Send player positions to other players
- [ ] Send block place/dig to other players
- [ ] Support saving changes to the world
- [x] Allow changing world generation
- [x] Support player disconnect

## Documentation

Documentation is provided in the READMEs contained in the proxy and frontend directories.

## License

This project is licensed under the MIT license.
