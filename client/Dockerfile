FROM node:lts-alpine
RUN mkdir /app
COPY . /app

RUN yarn add react-scripts -g
RUN yarn --cwd /app install

CMD [ "yarn","--cwd" ,"/app", "start" ]
