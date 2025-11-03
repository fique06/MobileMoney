FROM node:18-alpine as builder

WORKDIR /usr/src/app_momo
RUN apk add --no-cache bash git make gcc g++ python3 autoconf automake libtool nasm zlib-dev libpng-dev
ENV PATH /usr/src/app_momo/node_modules/.bin:$PATH
COPY package.json /usr/src/app_momo/package.json
RUN npm install -g bower grunt-cli
RUN npm install
RUN npm install -g bower 
RUN npm install -g grunt-cli
COPY . /usr/src/app_momo
RUN bower --allow-root install
RUN grunt build

#render on nginx
FROM nginx:1.19.3-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/app_momo/dist /usr/share/nginx/html

EXPOSE 8070
CMD ["nginx", "-g", "daemon off;"]

