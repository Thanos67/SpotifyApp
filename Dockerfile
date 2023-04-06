FROM node:16 AS ui-build
WORKDIR /usr/src/app
COPY . .
RUN npm install @angular/cli && npm install && npm run build


FROM node:16 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm install
COPY server.ts .


EXPOSE 3001
CMD [ "node", "server.ts" ]



