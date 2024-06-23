const express = require('express');
const router = express.Router();
const User = require('../models/user');
const userService = require('../services/user-service');

// Tüm kullanıcıları listeleme endpoint'i
router.get('/', async (req, res) => {
  try {
    // Tüm kullanıcıları bul ve sadece kullanıcı adlarını döndür
    const users = await User.find({}, 'username');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Hata durumunda geriye hata mesajı dönme
  }
});

// Kullanıcı kaydı oluşturma endpoint'i
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userService.register(username, password);
    res.status(201).json(user); // Başarılı kayıt durumunda geriye oluşturulan kullanıcıyı dönme
  } catch (error) {
    res.status(400).json({ error: error.message }); // Hata durumunda geriye hata mesajı dönme
  }
});

// Kullanıcı oturum açma endpoint'i
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userService.login(req, username, password);
    res.status(200).json(user); // Başarılı oturum açma durumunda geriye kullanıcı bilgilerini dönme
  } catch (error) {
    res.status(401).json({ error: error.message }); // Hata durumunda oturum açma hatası mesajı dönme
  }
});

// Mevcut kullanıcıyı belirleme endpoint'i
router.get('/current-user', async (req, res) => {
  try {
    const currentUser = req.session.username;
    if (currentUser) {
      res.status(200).json({ username: currentUser }); // Oturum açmış kullanıcı varsa geriye kullanıcı adını dönme
    } else {
      res.status(401).json({ message: 'User not logged in' }); // Oturum açmış kullanıcı yoksa hata mesajı dönme
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Hata durumunda geriye hata mesajı dönme
  }
});

// Kullanıcı oturumu sonlandırma endpoint'i
router.get('/logout', async (req, res) => {
  try {
    await userService.logout(req);
    res.status(200).json({ message: 'Logged out successfully' }); // Başarılı oturum sonlandırma durumunda mesaj dönme
  } catch (error) {
    res.status(500).json({ error: error.message }); // Hata durumunda geriye hata mesajı dönme
  }
});

module.exports = router;
