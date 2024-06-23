const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  googleId: String,
  facebookId: String,
  // Diğer alanlarınızı buraya ekleyebilirsiniz
});

// Passport-Local Mongoose pluginini kullanarak şifre işlemlerini yönetin
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'username' // Opsiyonel, kullanıcı adı alanının adını belirtir
});

module.exports = mongoose.model('User', userSchema);
