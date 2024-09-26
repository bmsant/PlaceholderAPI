  FROM node:18-alpine as base
  WORKDIR /app
  EXPOSE 3000

  COPY package*.json ./

  RUN npm install

  COPY . .

  CMD ["npm", "start"]