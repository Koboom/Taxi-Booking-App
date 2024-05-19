const { driverService } = require("../services")

const router = require("express").Router()

router.get("/" , async ( req, res) => {//söförleri yükle
    // const drivers = await driverService.load()
    res.send(await driverService.load())
    // res.render("drivers", { drivers })
})

router.post("/", async (req, res , next) => {//söförleri gönder
    try {
        const driver = await driverService.insert(req.body)
        res.send(driver)
    } catch(e) {
        next(e)
    }
})

router.delete("/:driverId", async (req, res) => {//söförleri sil
    await driverService.removeBy("_id", req.params.driverId)

    res.send("OK")
})

router.get("/young-drivers", async (req, res) => { //yaş aralığını kontrol et
    const drivers = await driverService.findYoungDrivers()

    res.render("drivers", { drivers})
})

router.get("/:driverId", async (req, res) => {
    const driver = await driverService.find(req.params.driverId)

    if(!driver) return res.status(404).send("Cannot find driver")
    // res.render("driver", { driver})
    res.send(driver)
})

router.patch("/:driverId", async (req, res) => {
    const { driverId } = req.params
    const { name } = req.body

    await driverService.update(driverId, { name})
})

module.exports = router