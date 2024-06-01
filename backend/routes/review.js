const express = require("express");
const router = express.Router();
const { reviewService } = require("../services");

// Tüm incelemeleri getirme
router.get("/", async (req, res) => {
    try {
        const reviews = await reviewService.load();
        res.send(reviews);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Yeni inceleme oluşturma
router.post("/", async (req, res) => {
    try {
        const review = await reviewService.insert(req.body);
        res.send(review);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Bir incelemenin detaylarını getirme
router.get("/:reviewId", async (req, res) => {
    try {
        const review = await reviewService.find(req.params.reviewId);
        if (!review) {
            return res.status(404).send("Review not found");
        }
        res.send(review);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Bir incelemenin güncellenmesi
router.patch("/:reviewId", async (req, res) => {
    try {
        await reviewService.update(req.params.reviewId, req.body);
        res.send("Review updated successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Bir incelemenin silinmesi
router.delete("/:reviewId", async (req, res) => {
    try {
        await reviewService.removeBy("_id", req.params.reviewId);
        res.send("Review deleted successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
