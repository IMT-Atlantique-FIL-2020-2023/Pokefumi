FROM node:16
ARG SERVICE=stats
RUN  npm i -g nx
WORKDIR /app/pokefumi/apps/$SERVICE
COPY package*.json ./
RUN npm install
COPY . .
RUN nx run $SERVICE:install
RUN cd apps/$SERVICE && npx prisma db push
RUN nx dep-graph --file dep-graph.json
RUN nx run $SERVICE:build
ENV NODE_ENV=production
ENV JWT_SECRET=ILIKEPOTATOES
EXPOSE 3337
ENV SERVICE ${SERVICE}
CMD node dist/apps/${SERVICE}/main.js
