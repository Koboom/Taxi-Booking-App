const express = require('express');
const passport = require('passport');
const UserService = require('../services/user-service'); // UserService'i içe aktar
const User = require('../models/user'); // User modeli içe aktar
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

        await newUser.setPassword(password);
        await newUser.save();

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
            return res.json({ message: "Anmeldung erfolgreich!" });
        });
    })(req, res, next);
});

module.exports = router;
