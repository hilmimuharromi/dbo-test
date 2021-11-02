FROM node:lts-alpine
RUN mkdir /app
COPY . /app

RUN yarn --cwd /app install
RUN yarn add react-scripts@3.4.1 -g

CMD [ "yarn","--cwd" ,"/app", "start" ]
