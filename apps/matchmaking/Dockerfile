FROM node:16.14.0-buster
ARG SERVICE=matchmaking
RUN  npm i -g nx
WORKDIR /app/$SERVICE
COPY package*.json ./
RUN npm install
COPY . .
RUN nx run $SERVICE:install
RUN cd apps/$SERVICE && npx prisma db push
ENV NODE_ENV=production
ENV JWT_SECRET=ILIKEPOTATOES
EXPOSE 3334
CMD [ "nx", "run", "$SERVICE:serve" ]
