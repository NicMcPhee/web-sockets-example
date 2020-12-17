# Build the client files in a build stage
FROM node:14-alpine as build

WORKDIR /client

# Install npm dependencies
COPY package*.json /client/
RUN npm ci

# Build the Angular project
COPY . /client
RUN npm run docker-build


# Build the production web server and client container
# Caddy is a web server with automatic HTTPS
FROM abiosoft/caddy
# Copy the client files from the build stage
COPY --from=ngbuild /tmp/client/dist/client /www/client
# Copy the Caddyfile (configuration for Caddy)
COPY ./Caddyfile /etc/Caddyfile
# Set default Caddy host
ENV CADDY_HOST localhost
