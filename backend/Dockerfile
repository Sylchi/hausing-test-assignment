FROM node:lts
WORKDIR /opt/app/backend
COPY package.json .
RUN yarn
COPY . .
CMD  node index.js