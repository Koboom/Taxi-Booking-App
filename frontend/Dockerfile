# get an operating system
# i want to direkt from node to docker dep.
# install node runtime
FROM node:21.5.0-alpine3.19

WORKDIR /app

COPY package.json package-lock.json ./

#copy files
RUN npm install

COPY . .

#install npm dependencies
# run application

EXPOSE 7070

CMD [ "npm", "run", "dev" ]