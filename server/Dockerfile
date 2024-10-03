###################
# BUILD FOR PRODUCTION
###################
FROM node:20 AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

USER node

###################
# PRODUCTION
###################
FROM node:20-slim AS production

WORKDIR /usr/src/app

COPY --chown=node:node package*.json .
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/src/i18n/locales ./src/i18n/locales

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]