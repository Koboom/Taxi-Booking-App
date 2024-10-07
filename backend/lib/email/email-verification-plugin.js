const mongoose = require('mongoose');
const { sendEmailVerification } = require('./index'); // Email gönderim fonksiyonu

const nanoid = async () => {
  const { customAlphabet } = await import("nanoid");
  return customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 40);
};
// Şemayı oluştur
const emailTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, expires: '15m' }, // 15 dakika sonra silinir
});

// Token oluşturma işlemini pre middleware ile yap
emailTokenSchema.pre('save', async function (next) {
  if (!this.token) {
    const generateToken = await nanoid();
    this.token = generateToken();
  }
  next();
});

const EmailToken = mongoose.model('EmailToken', emailTokenSchema, 'email-tokens');

module.exports = function (schema) {
  schema.add({
    isVerified: {
      type: Boolean,
      default: false,
    },
  });

  schema.methods.sendVerificationEmail = async function () {
    await EmailToken.deleteMany({ user: this }); // Eski tokenleri sil

    const { token } = await EmailToken.create({ user: this }); // Yeni token oluştur

    await sendEmailVerification(this.email, this.firstName, token); // Email gönder
  };

  schema.statics.verifyEmailByToken = async function (token) {
    const emailToken = await EmailToken.findOneAndRemove({ token });

    if (!emailToken) throw new Error('Token is invalid');

    await this.findByIdAndUpdate(emailToken.user, { isVerified: true }); // Kullanıcıyı doğrula
  };

  schema.index({ email: 1, isVerified: 1 });
};
