FROM node:16.13.0
ARG SERVICE=stats
RUN  npm i -g nx
WORKDIR /app/pokefumi/apps/$SERVICE
COPY package*.json ./
RUN npm install
COPY . .
RUN nx run --verbose $SERVICE:install
RUN cd apps/$SERVICE && npx prisma db push
RUN nx run --verbose $SERVICE:build
ENV NODE_ENV=production
ENV JWT_SECRET=ILIKEPOTATOES
EXPOSE 3337
CMD [ "node", "dist/$SERVICE/main.js" ]
