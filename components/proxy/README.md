# electric-squid-proxy

This directory hosts the code for the electric-squid Proxy Server. This proxy enables communication between the browser and Minecraft clients by opening a network port and translating the Minecraft protocol.

## Installation

1. Clone this repository
2. Copy ".env.example" to ".env" and customize its contents
3. Run `npm install` to install all dependencies
4. Start the server with `npm start`

This will create WebSocket server on localhost:3005 and will start hosting Minecraft servers on port :25000 and upwards

## Hosting frontend

The proxy supports hosting the static build files created by the frontend. To enable this, build the frontend by running "npm run build" in "components/client/" and set "HOST_FRONTEND" to "true" in your ".env"

You can set "PROXY_HOST" to an empty value ("PROXY_HOST=") in the frontend's ".env" file to use the same endpoint.
