const express = require('express');
const passport = require('passport');
const UserService = require('../services/user-service'); // UserService'i içe aktar
const User = require('../models/user'); // User modeli içe aktar
const Message = require('../models/message'); // Message modeli içe aktar
const ChatRoom = require('../models/chatRoom'); // ChatRoom modeli içe aktar
const router = express.Router();

// Kullanıcı kaydı
router.post('/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone, location, age, isAdmin, username } = req.body;
        console.log("Gelen istek", req.body);

        if (!email || !password || !firstName || !lastName || !username) {
            return res.status(400).json({ message: "E-Mail- und Passwortfelder dürfen nicht leer sein." });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Geben Sie eine gültige E-Mail-Adresse ein." });
        }

        // Şifre uzunluğunu kontrol et
        if (password.length < 6) {
            return res.status(400).json({ message: "Das Passwort muss mindestens 6 Zeichen lang sein." });
        }

        if (await UserService.isEmailRegistered(email)) {
            return res.status(400).json({ message: "Diese E-Mail ist bereits registriert." });
        }

        const newUser = new User({
            email,
            firstName,
            lastName,
            phone,
            location,
            age,
            isAdmin,
            isVerified: false,
            username
        });

        await newUser.setPassword(password); // Şifreyi şifrele
        await newUser.save(); // Kullanıcıyı kaydet

        res.status(201).json({ message: "Benutzer hat sich erfolgreich registriert!" });
    } catch (error) {
        console.error("Fehler bei der Benutzerregistrierung:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Ungültige Daten." });
        }
        res.status(500).json({ message: "Die Registrierung ist fehlgeschlagen.", error });
    }
});

// Kullanıcı girişi
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).json({ message: info.message || "Fehler bei der Anmeldung." });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({ message: "Anmeldung erfolgreich!", user: user });
        });
    })(req, res, next);
});

// Mesaj gönderme rotası
router.post('/sendMessage', async (req, res) => {
    const { senderId, receiverId, content, chatRoomId } = req.body;

    try {
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);
        const chatRoom = await ChatRoom.findById(chatRoomId);

        if (!sender || !receiver || !chatRoom) {
            return res.status(404).json({ message: "Kullanıcı veya chat odası bulunamadı!" });
        }

        // Mesajı oluştur ve veritabanına kaydet
        const message = new Message({
            sender: senderId,
            receiver: receiverId,
            content: content,
            chatRoom: chatRoomId
        });

        await message.save();

        // Socket.IO ile odaya mesaj gönder
        req.app.get('io').to(chatRoomId).emit('receiveMessage', message);

        res.status(201).json({ message: "Mesaj başarıyla gönderildi!", message });

    } catch (error) {
        console.error("Mesaj gönderme hatası:", error);
        res.status(500).json({ message: "Mesaj gönderilirken bir hata oluştu." });
    }
});

module.exports = router;
