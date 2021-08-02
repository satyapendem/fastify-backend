FROM node:latest

# create base directory for app
RUN mkdir -p /usr/local/satya-app
WORKDIR /usr/local/satya-app

COPY package.json /usr/local/satya-app/

RUN npm install
COPY . /usr/local/satya-app
ADD public /usr/local/satya-app/public

EXPOSE 5051

CMD ["npm", "start"]
