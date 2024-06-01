const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const indexRouter = require("./routes/index")
const passengersRouter = require("./routes/passengers")
const driversRouter = require("./routes/drivers")

require("./mongo-connection")

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.set("view engine", "pug")

app.use("/passengers", passengersRouter)
app.use("/", indexRouter)
app.use("/drivers", driversRouter)

module.exports = app