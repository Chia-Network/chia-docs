FROM node:17

RUN mkdir /site
WORKDIR /site

COPY . .

EXPOSE 3000

RUN apt install python3 make g++ git openssl
RUN yarn && \
    yarn build

CMD yarn serve
