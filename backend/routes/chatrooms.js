const express = require("express");
const chatRoomService = require("../services/chat-room-socket/chatroom-service");

const router = express.Router();

// Chat odası oluştur
router.post("/", async (req, res) => {
  try {
    const chatRoom = await chatRoomService.insert(req.body);
    res.status(201).send(chatRoom);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Kullanıcıya ait chat odalarını getir
router.get("/user/:userId", async (req, res) => {
  try {
    const chatRooms = await chatRoomService.getRoomsForUser(req.params.userId);
    res.status(200).send(chatRooms);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Tüm chat odalarını getir
router.get("/", async (req, res) => {
  try {
    const chatRooms = await chatRoomService.load();
    res.status(200).send(chatRooms);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Chat odası sil
router.delete("/:id", async (req, res) => {
  try {
    await chatRoomService.removeBy("id", req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
