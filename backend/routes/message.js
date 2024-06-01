const express = require("express");
const router = express.Router();
const { messageService } = require("../services");

// Tüm iletileri getirme
router.get("/", async (req, res) => {
    try {
        const messages = await messageService.load();
        res.send(messages);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Yeni ileti oluşturma
router.post("/", async (req, res) => {
    try {
        const message = await messageService.insert(req.body);
        res.send(message);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Bir iletiyi detaylarını getirme
router.get("/:messageId", async (req, res) => {
    try {
        const message = await messageService.find(req.params.messageId);
        if (!message) {
            return res.status(404).send("Message not found");
        }
        res.send(message);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Bir iletiyi güncelleme
router.patch("/:messageId", async (req, res) => {
    try {
        await messageService.update(req.params.messageId, req.body);
        res.send("Message updated successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Bir iletiyi silme
router.delete("/:messageId", async (req, res) => {
    try {
        await messageService.removeBy("_id", req.params.messageId);
        res.send("Message deleted successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
