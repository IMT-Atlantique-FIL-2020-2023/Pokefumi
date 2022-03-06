FROM node:16
ARG SERVICE=round
RUN  npm i -g nx
WORKDIR /app/pokefumi/apps/$SERVICE
COPY package*.json ./
RUN npm install
COPY nx.json ./
COPY webpack webpack
COPY tsconfig.base.json ./
COPY packages/pokefumi-api packages/pokefumi-api
COPY packages/pokefumi-common packages/pokefumi-common
COPY apps/$SERVICE apps/$SERVICE
RUN nx run $SERVICE:install
RUN nx run pokefumi-api:install
RUN nx dep-graph --file dep-graph.json
RUN nx run $SERVICE:build
ENV NODE_ENV=production
ENV JWT_SECRET=ILIKEPOTATOES
EXPOSE 3335
ENV SERVICE ${SERVICE}
CMD node dist/apps/${SERVICE}/main.js
