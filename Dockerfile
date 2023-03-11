FROM node:18 AS development

WORKDIR /usr/src/app

COPY . .

RUN npm install --only=development

RUN npm run build

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY . .

RUN npm install --only=production

# copy from build image

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 8087

CMD ["node", "dist/src/main"]
