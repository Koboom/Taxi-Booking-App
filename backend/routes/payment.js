const express = require("express");
const router = express.Router();
const { paymentService } = require("../services");

// Tüm ödemeleri getirme
router.get("/", async (req, res) => {
    try {
        const payments = await paymentService.load();
        res.send(payments);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Yeni ödeme oluşturma
router.post("/", async (req, res) => {
    try {
        const payment = await paymentService.insert(req.body);
        res.send(payment);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Ödeme detaylarını getirme
router.get("/:paymentId", async (req, res) => {
    try {
        const payment = await paymentService.find(req.params.paymentId);
        if (!payment) {
            return res.status(404).send("Payment not found");
        }
        res.send(payment);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Bir ödemenin güncellenmesi
router.patch("/:paymentId", async (req, res) => {
    try {
        await paymentService.update(req.params.paymentId, req.body);
        res.send("Payment updated successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Bir ödemenin silinmesi
router.delete("/:paymentId", async (req, res) => {
    try {
        await paymentService.removeBy("_id", req.params.paymentId);
        res.send("Payment deleted successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
