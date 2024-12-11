FROM node:lts AS runtime
RUN mkdir app
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4321
CMD ["npm","run","dev","--","--host"]