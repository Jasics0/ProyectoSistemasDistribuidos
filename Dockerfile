FROM node:12.18.1
WORKDIR /app
RUN npm install express
COPY app/app.js .
CMD ["node","app.js"]
