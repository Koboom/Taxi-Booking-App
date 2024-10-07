# # get an operating system
# # i want to direkt from node to docker dep.
# # install node runtime
# FROM node:21.5.0-alpine3.19

# WORKDIR /app

# COPY package.json package-lock.json ./

# #copy files
# RUN npm install

# COPY . .

# RUN npm run build

# #install npm dependencies
# # run application

# EXPOSE 8080

# CMD [ "npm", "run", "dev" ]
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

# Uygulamayı build et
RUN npm run build

# Uygulamanın dinleyeceği portu aç
EXPOSE 8080

# Uygulamayı başlat
CMD ["npm", "run", "dev"]
