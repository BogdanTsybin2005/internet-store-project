FROM node:latest
WORKDIR /internetStore
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 3000
CMD [ "npm", "start" ]



# Я хотел применить вариант кода для моего Dockerfile ниже, но он не работает должным образом.
# Когда я создаю свой образ и контейнер на его основе чтобы потом его запустить, 
# то у меня после запуска контейнера не отображаются никакая ссылка по типу localhost:3000 или что-нибудь вроде того


# FROM node:latest AS step1
# WORKDIR /internetStore
# COPY package*.json ./
# RUN npm install
# COPY . ./
# RUN npm run build
# RUN ls -la /internetStore/build


# FROM nginx:alpine
# EXPOSE 80
# COPY --from=step1 /internetStore/build /usr/share/nginx/html
# CMD ["nginx", "-g", "daemon off;"]




