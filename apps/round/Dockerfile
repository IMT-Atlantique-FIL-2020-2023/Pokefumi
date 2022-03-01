FROM node:16.13.0
ARG SERVICE=round
RUN  npm i -g nx
WORKDIR /app/pokefumi/apps/$SERVICE
COPY package*.json ./
RUN npm install
COPY . .
RUN nx run $SERVICE:install
RUN nx run $SERVICE:build
ENV NODE_ENV=production
ENV JWT_SECRET=ILIKEPOTATOES
EXPOSE 3335
CMD [ "node", "dist/$SERVICE/main.js" ]
