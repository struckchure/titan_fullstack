FROM node:20-alpine

WORKDIR /app

COPY . .

RUN yarn
RUN npx prisma generate
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]
