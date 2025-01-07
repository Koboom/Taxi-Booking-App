const { orderBookingService } = require("../../services");
const router = require("express").Router();

// GET /orders - Tüm siparişleri listele
router.get('/', async (req, res, next) => {
    try {
        const orders = await orderBookingService.load();
        res.send(orders);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
