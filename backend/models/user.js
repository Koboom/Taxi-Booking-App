const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// Kullanıcı şemasını oluştur
const UserSchema = new Schema({
    firstName: { type: String, required: true }, // Ad
    lastName: { type: String, required: true }, // Soyad
    email: { type: String, required: true, unique: true }, // E-posta
    phone: { type: String }, // Telefon numarası (isteğe bağlı)
    location: { type: String }, // Konum (isteğe bağlı)
    age: { type: Number }, // Yaş (isteğe bağlı)
    isAdmin: { type: Boolean, default: false }, // Yönetici yetkisi
    isVerified: { type: Boolean, default: false }, // E-posta doğrulaması
    username: { type: String, required: true, unique: true } // username alanı
});

// passport-local-mongoose eklentisini kullan
UserSchema.plugin(passportLocalMongoose);

// Kullanıcı modelini dışa aktar
module.exports = mongoose.model('User', UserSchema);
