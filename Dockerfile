FROM node:18 AS build_image

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY ./ ./
RUN npm install && npm run build

EXPOSE 3000
# CMD ["npm", "start"]

FROM node:18-alpine

WORKDIR /app

# copy from build image

COPY --from=build_image /usr/app/dist ./dist

COPY --from=build_image /usr/app/node_modules ./node_modules

RUN npm i -g http-server

CMD http-server ./dist
