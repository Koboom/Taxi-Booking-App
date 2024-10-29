const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");
const session = require("express-session");
const logger = require("./config/logger");
const passport = require("passport");
const User = require("./models/user");

const indexRouter = require("./routes/index");
const passengersRouter = require("./routes/passengers");
const driversRouter = require("./routes/drivers");
const customerRouter = require("./routes/customers");
const itemsRouter = require("./routes/items");
const menusRouter = require("./routes/menus");
const paymentsRouter = require("./routes/payments");
const reservationsRouter = require("./routes/reservations");
const reviewsRouter = require("./routes/reviews");
const staffsRouter = require("./routes/staffs");
const waitersRouter = require("./routes/waiters");
const tablesRouter = require("./routes/tables");
const userRoutes = require("./routes/users");
const messageRouter = require("./routes/message");
const chatRoomRouter = require("./routes/chatrooms");

require("./mongo-connection"); // MongoDB bağlantısı
const { initializeSocket } = require("./socket-connection");
require("dotenv").config();

const app = express();

app.set("view engine", "pug");

// Oturum anahtarını oluşturma
const server = require("http").createServer(app);
initializeSocket(server);
const secretKey = crypto.randomBytes(32).toString('hex');
logger.info("Secret key oluşturuldu:", secretKey);
console.log("Secret key:", secretKey);

// Middleware'leri kullanma
app.use(bodyParser.json({ limit: "10mb"}));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// CORS middleware
app.use(cors({
  origin: ['https://yukselsoftware.de', 'http://localhost:8080', 'https://backend-fimqwb2tta-ez.a.run.app'], // Canlı ve geliştirme domainlerini ekleyin
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false
}));

// Passport'ı başlatma ve yapılandırma
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Rotaları tanımlama
app.use("/", indexRouter);
app.use("/passengers", passengersRouter);
app.use("/customers", customerRouter);
app.use("/drivers", driversRouter);
app.use("/items", itemsRouter);
app.use("/menus", menusRouter);
app.use("/payments", paymentsRouter);
app.use("/reservations", reservationsRouter);
app.use("/reviews", reviewsRouter);
app.use("/staffs", staffsRouter);
app.use("/waiters", waitersRouter);
app.use("/tables", tablesRouter);
app.use("/users", userRoutes);
app.use("/messages", messageRouter);
app.use("/chatrooms", chatRoomRouter);

// Hata yakalama
app.use((err, req, res, next) => {
  logger.error(`Hata oluştu: ${err.message}`);
  console.log(err.stack);
  res.status(500).send('Etwas ist schief gelaufen!');
});

logger.info('Uygulama çalışıyor...');
logger.warn('Bu bir uyarı mesajı.');
logger.error('Bu bir hata mesajı.');

module.exports = { app, server };
