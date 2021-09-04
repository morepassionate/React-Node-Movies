#----------------------
# Stage 1: dependencies
#----------------------
FROM node:12.22-alpine3.14 AS dependencies

WORKDIR /home/

COPY ["package.json", "package-lock.json", ".npmrc", "./"]

RUN npm i

#-------------
# Stage 2: app
#-------------
FROM dependencies

WORKDIR /home/

COPY [".babelrc.js", ".env", "./"]
COPY configs ./configs/
COPY src ./src/

RUN npm run build

COPY . .

EXPOSE 8081
CMD [ "npm", "start" ]