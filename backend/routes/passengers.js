const { passengerService, bookingService } = require("../services")
const router = require("express").Router()

// router.get("/", async (req, res) => {
//     // const passengers = await passengerService.load() pug ile kullan

//     // res.render("passengers", { passengers })// pug ile kullan
//     res.send(await passengerService.load()) // mongodb ile kullan
// })

router.get("/", async (req, res, next) => {
    try {
        const passengers = await passengerService.load();
        res.send(passengers); // MongoDB kullanarak JSON olarak veriyi döndürme
    } catch (error) {
        next(error); // Hata durumunda error middleware'ine yönlendirme
    }
});

router.post("/", async (req, res, next) => {
    try {
        const passenger = await passengerService.insert(req.body);
        res.status(201).send(passenger); // Yeni yolcu oluşturulduğunda 201 Created durumu ile yanıt verme
    } catch (error) {
        next(error); // Hata durumunda error middleware'ine yönlendirme
    }
});

router.get("/:passengerId", async (req, res, next) => {
    try {
        const passenger = await passengerService.find(req.params.passengerId);
        if (!passenger) {
            return res.status(404).send("Cannot find passenger");
        }
        res.send(passenger); // MongoDB kullanarak JSON olarak yolcuyu döndürme
    } catch (error) {
        next(error); // Hata durumunda error middleware'ine yönlendirme
    }
});

router.patch("/:passengerId", async (req, res, next) => {
    try {
        const { passengerId } = req.params;
        const { name } = req.body;
        await passengerService.update(passengerId, { name });
        res.send("OK"); // Güncelleme işlemi başarılıysa OK yanıtı
    } catch (error) {
        next(error); // Hata durumunda error middleware'ine yönlendirme
    }
});

router.delete("/:passengerId", async (req, res, next) => {
    try {
        await passengerService.removeBy("_id", req.params.passengerId);
        res.send("OK"); // Silme işlemi başarılıysa OK yanıtı
    } catch (error) {
        next(error); // Hata durumunda error middleware'ine yönlendirme
    }
});

// GET /passengers/:passengerId/bookings - Müşterinin sipariş geçmişini getir
router.get('/:passengerId/bookings', async (req, res, next) => {
    try {
        const passenger = await passengerService.find(req.params.passengerId)
        if(!passenger) {
            return res.status(404).send("Cannot find passenger")
        }
        const bookings = passenger.bookings
        res.send(bookings)
    } catch (error) {
        next(error); // Hata durumunda error middleware'ine yönlendirme
    }
})

router.post("/:passengerId/bookings", async (req, res, next) => {
    try {
        const { passengerId } = req.params;
        const { driverId, origin, destination } = req.body;
        const booking = await bookingService.book(driverId, passengerId, origin, destination);
        res.send(booking); // Yolcu için rezervasyon yapıldığında booking bilgisini döndürme
    } catch (error) {
        next(error); // Hata durumunda error middleware'ine yönlendirme
    }
});

module.exports = router
