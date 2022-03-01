FROM node:16
ARG SERVICE=stats
ENV NX_CACHE_PROJECT_GRAPH=false
RUN  npm i -g nx
WORKDIR /app/pokefumi/apps/$SERVICE
COPY package*.json ./
RUN npm install
COPY . .
RUN nx run --verbose $SERVICE:install
RUN cd apps/$SERVICE && npx prisma db push
RUN nx dep-graph --file dep-graph.json
RUN nx run --verbose $SERVICE:build
ENV NODE_ENV=production
ENV JWT_SECRET=ILIKEPOTATOES
EXPOSE 3337
CMD [ "node", "dist/$SERVICE/main.js" ]
