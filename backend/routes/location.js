const express = require("express");
const router = express.Router();
const { locationService } = require("../services");

// Tüm konumları getirme
router.get("/", async (req, res) => {
    try {
        const locations = await locationService.load();
        res.send(locations);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Yeni konum oluşturma
router.post("/", async (req, res) => {
    try {
        const location = await locationService.insert(req.body);
        res.send(location);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Bir konumun detaylarını getirme
router.get("/:locationId", async (req, res) => {
    try {
        const location = await locationService.find(req.params.locationId);
        if (!location) {
            return res.status(404).send("Location not found");
        }
        res.send(location);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Bir konumu güncelleme
router.patch("/:locationId", async (req, res) => {
    try {
        await locationService.update(req.params.locationId, req.body);
        res.send("Location updated successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Bir konumu silme
router.delete("/:locationId", async (req, res) => {
    try {
        await locationService.removeBy("_id", req.params.locationId);
        res.send("Location deleted successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
