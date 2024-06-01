const express = require("express");
const router = express.Router();
const { vehicleService } = require("../services");

// Tüm araçları getirme
router.get("/", async (req, res) => {
    try {
        const vehicles = await vehicleService.load();
        res.send(vehicles);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Yeni araç oluşturma
router.post("/", async (req, res) => {
    try {
        const vehicle = await vehicleService.insert(req.body);
        res.send(vehicle);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Bir aracın detaylarını getirme
router.get("/:vehicleId", async (req, res) => {
    try {
        const vehicle = await vehicleService.find(req.params.vehicleId);
        if (!vehicle) {
            return res.status(404).send("Vehicle not found");
        }
        res.send(vehicle);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Bir aracın güncellenmesi
router.patch("/:vehicleId", async (req, res) => {
    try {
        await vehicleService.update(req.params.vehicleId, req.body);
        res.send("Vehicle updated successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Bir aracın silinmesi
router.delete("/:vehicleId", async (req, res) => {
    try {
        await vehicleService.removeBy("_id", req.params.vehicleId);
        res.send("Vehicle deleted successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
