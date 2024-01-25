# Build stage
FROM node:20.10-bookworm-slim as build
WORKDIR /app
COPY . .
RUN npm install

RUN npm run build

EXPOSE 4173 
CMD ["npm", "run", "preview"]
