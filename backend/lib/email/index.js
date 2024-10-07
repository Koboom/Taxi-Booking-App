const nodemailer = require('nodemailer')
const pug = require('pug')
const { htmlToText } = require('html-to-text')
const path = require('path')

const transport = nodemailer.createTransport({ // email gönderimi için bir taşıyıcı oluşturuyor
  host: process.env.EMAIL_HOST, //email sağlayıcının hostu
  port: process.env.EMAIL_PORT, //email sağlayıcının portu
  auth: { // kullanıcı adı ve şifresi
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
})

async function send(payload) { // nodemail ile email gönderme fonksiyonu
  try {
    await transport.sendMail({ text: htmlToText(payload.html), ...payload }) //htmltoText ile html formatındaki email içeriği,düz metin formatına
    //çevrilerek email gönderimine eklenir.email istemcisi html i destemese bile düzgün birşekilde iletilir.
  } catch (err) {
    console.log(err)
    throw new Error('There is a problem sending email. Please try again later.')
  }
}

async function sendEmailVerification(email, name, token) { // doğrulama emaili gönderiliyor.
  if (!name || !token) throw new Error('Name and token must be provided.')

  const verificationUrl = `${process.env.BACKEND_BASE_PATH}/email-verification?token=${token}`

  await send({
    from: '"Yuksel" <nykoyunoglu@gmail.com>',
    to: email,
    subject: 'Verify your Yuksel Software Account',
    html: pug.renderFile(path.join(__dirname, '/templates/verify-email.pug'), {
      name,
      verificationUrl
    })
  })
}

module.exports = { sendEmailVerification }
