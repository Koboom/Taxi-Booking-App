const express = require("express");
const router = express.Router();
const { notificationService } = require("../services");

// Tüm bildirimleri getirme
router.get("/", async (req, res) => {
    try {
        const notifications = await notificationService.load();
        res.send(notifications);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Yeni bildirim oluşturma
router.post("/", async (req, res) => {
    try {
        const notification = await notificationService.insert(req.body);
        res.send(notification);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Bir bildirimi detaylarını getirme
router.get("/:notificationId", async (req, res) => {
    try {
        const notification = await notificationService.find(req.params.notificationId);
        if (!notification) {
            return res.status(404).send("Notification not found");
        }
        res.send(notification);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Bir bildirimi güncelleme
router.patch("/:notificationId", async (req, res) => {
    try {
        await notificationService.update(req.params.notificationId, req.body);
        res.send("Notification updated successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Bir bildirimi silme
router.delete("/:notificationId", async (req, res) => {
    try {
        await notificationService.removeBy("_id", req.params.notificationId);
        res.send("Notification deleted successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
