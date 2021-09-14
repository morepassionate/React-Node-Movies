#----------------------
# Stage 1: dependencies
#----------------------
FROM node:12.22-alpine3.14 AS dependencies

WORKDIR /home/

COPY ["package.json", "package-lock.json", ".npmrc", "./"]

RUN npm ci --production && npm cache clean --force

#-------------
# Stage 2: app
#-------------
FROM dependencies

WORKDIR /home/

COPY [".babelrc.js", "./"]
COPY configs ./configs/
COPY src ./src/

ARG SOURCE_HASH
ENV SOURCE_HASH=$SOURCE_HASH
ENV RENDERING=server 

RUN echo "SOURCE_HASH: ${SOURCE_HASH}"
RUN npm run build

COPY . .

EXPOSE 8081
CMD [ "npm", "start" ]