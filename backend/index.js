const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user"); // Kullanıcı modelinizin yolu
const session = require("express-session");
const crypto = require('crypto');

const indexRouter = require("./routes/index");
const passengersRouter = require("./routes/passengers");
const driversRouter = require("./routes/drivers");
const userRoutes = require("./routes/users"); // Kullanıcı rotalarının dosya yolu

require("./mongo-connection");

const app = express();

// Oturum anahtarını oluşturma
const secretKey = crypto.randomBytes(32).toString('hex');
console.log("Secret key:", secretKey);

// Middleware'leri kullanma
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: secretKey, // Oturum verilerinin şifreleme anahtarı
  resave: false,
  saveUninitialized: false
}));

// Passport'ı başlatma ve yapılandırma
app.use(passport.initialize());
app.use(passport.session());

// Passport konfigürasyonunu yapma
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Rotaları tanımlama
app.use("/passengers", passengersRouter);
app.use("/", indexRouter);
app.use("/drivers", driversRouter);
app.use("/users", userRoutes); // Kullanıcı rotalarını ekleyin

module.exports = app;
