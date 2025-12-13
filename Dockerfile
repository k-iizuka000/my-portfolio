FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --legacy-peer-deps && npm audit fix || true

EXPOSE 3030

CMD ["npm", "run", "dev"]
