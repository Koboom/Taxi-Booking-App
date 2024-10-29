const express = require("express");
const messageService = require("../services/message-service");

const router = express.Router();

// Mesaj oluştur
router.post("/", async (req, res) => {
  try {
    const message = await messageService.insert(req.body);
    res.status(201).send(message);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Belirli bir oda için mesajları getir
router.get("/room/:chatRoomId", async (req, res) => {
  try {
    const messages = await messageService.getMessagesByChatRoom(req.params.chatRoomId);
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Belirli bir kullanıcıya gelen mesajları getir
router.get("/user/:userId", async (req, res) => {
  try {
    const messages = await messageService.getMessagesForUser(req.params.userId);
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Mesaj sil
router.delete("/:id", async (req, res) => {
  try {
    await messageService.removeBy("id", req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
