FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --legacy-peer-deps

EXPOSE 3030

CMD ["npm", "run", "dev"]
