FROM node:20-alpine AS development

WORKDIR /app

LABEL project="farm-management"
LABEL component="frontend"
LABEL stage="development"

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

RUN apk add --no-cache wget

CMD ["npm", "run", "dev"]

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app ./

ENV NODE_ENV=production

RUN npm run build
CMD ["npm", "start"]
