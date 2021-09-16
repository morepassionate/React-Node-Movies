#----------------------
# Stage 1: dependencies
#----------------------
FROM node:12.22-alpine3.14 AS dependencies

WORKDIR /usr/app
COPY ["package.json", "package-lock.json", ".npmrc", "./"]

RUN npm ci --production && npm cache clean --force

#-------------
# Stage 2: app
#-------------
FROM dependencies

WORKDIR /usr/app
COPY [".babelrc.js", "./"]
COPY configs ./configs/
COPY src ./src/

ARG SOURCE_HASH
ENV SOURCE_HASH=$SOURCE_HASH
ARG SOURCE_NAME
ENV SOURCE_NAME=$SOURCE_NAME
ARG TMDB_API_ACCESS_TOKEN
ENV TMDB_API_ACCESS_TOKEN=$TMDB_API_ACCESS_TOKEN
ARG TMDB_API_REGION
ENV TMDB_API_REGION=$TMDB_API_REGION
ENV RENDERING=server 

RUN echo "SOURCE_HASH: ${SOURCE_HASH}"
RUN echo "SOURCE_NAME: ${SOURCE_NAME}"
RUN npm run build
EXPOSE 8081
USER node

CMD [ "node", "./dist/server.js" ]