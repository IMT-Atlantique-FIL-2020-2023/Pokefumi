FROM node:16.13.0
ARG SERVICE=user
RUN  npm i -g nx
WORKDIR /app/pokefumi/apps/$SERVICE
COPY package*.json ./
RUN npm install
COPY . .
RUN nx run $SERVICE:install
RUN cd apps/$SERVICE && npx prisma db push
RUN nx run $SERVICE:build
ENV NODE_ENV=production
ENV JWT_SECRET=ILIKEPOTATOES
EXPOSE 3333
CMD [ "node", "dist/$SERVICE/main.js" ]
