###################
# BUILD FOR PRODUCTION
###################
FROM node:20 AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

RUN npm install -g @angular/cli@17

COPY --chown=node:node . .

RUN ng build

USER node

###################
# PRODUCTION
###################
FROM nginx:1.26.2-alpine-slim AS production

COPY --chown=node:node nginx.conf /etc/nginx/nginx.conf

COPY --chown=node:node --from=build /usr/src/app/dist/client/browser /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
