FROM node:16.14.0-buster
ARG SERVICE=round
RUN  npm i -g nx
WORKDIR /app/$SERVICE
COPY package*.json ./
RUN npm install
COPY . .
RUN nx run $SERVICE:install
ENV NODE_ENV=production
ENV JWT_SECRET=ILIKEPOTATOES
EXPOSE 3335
CMD [ "nx", "run", "$SERVICE:serve" ]
