FROM node:slim
COPY . /build
WORKDIR /build
EXPOSE 8001
RUN npm install
WORKDIR /build/build
RUN npm run build
CMD [ "node", "index.js" ]