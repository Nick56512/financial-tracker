FROM node:slim
COPY . /build
WORKDIR /build
RUN npm run build
CMD [ "node", "index.js" ]
