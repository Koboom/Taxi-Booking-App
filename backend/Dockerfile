# # get an operating system
# # i want to direkt from node to docker dep.
# # install node runtime
# FROM node:21.5.0-alpine3.19

# WORKDIR /app

# COPY package.json package-lock.json ./

# #copy files
# RUN npm install

# COPY . .

# #install npm dependencies
# # run application

# EXPOSE 3000

# CMD [ "npm", "start" ]
# Belirli bir Node.js versiyonunu ve Alpine Linux sürümünü kullanarak temel imajı al
FROM node:21.5.0-alpine3.19

# Çalışma dizinini /app olarak ayarla
WORKDIR /app

# package.json ve package-lock.json dosyalarını çalışma dizinine kopyala
COPY package.json package-lock.json ./

# npm bağımlılıklarını yükle
RUN npm install

# Uygulamanın geri kalanını çalışma dizinine kopyala
COPY . .

# Uygulamanın dinleyeceği portu aç
EXPOSE 8080

# Çevresel değişken olarak PORT=8080 ayarla
ENV PORT=8080

# Uygulamayı başlat
CMD ["npm", "start"]
