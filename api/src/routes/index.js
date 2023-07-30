const { Router } = require("express");

// Importar todos los routers;
const router = Router();
const getGamesNameRouter = require("./getGamesName");
const postGamesRouter = require("./postGames");
const getGamesIdRouter = require("./getGamesId");
const getGenresRouter = require("./getGenres");
const deleteGameRouter = require("./deleteGame");
const putGameRouter = require("./putGame");
const sortedGames = require("./sortedGames")
const filteredPlatforms = require("./filteredPlatforms")
const createUser = require("./createUser")
const createCart = require("./createCart")
const getuserid = require("./getUserId")
const getuser = require("./getUserName")
const updateUser = require("./updateUser");
const deleteUser = require("./deleteUser")
const updateUserAdmin = require("./updateUserAdmin")
const login = require("./login")
const loginUser = require('./auth')
const payment = require("./payment")
const getSales = require("./getSales")
const getSalesId = require("./getSales")
const registroRouter = require('./mailregistro');
const carritoRouter = require('./mailcarrito');
const bulkCreateDescriptionsGames = require('./updateGamesDescription')
const createBulkDB = require("./createBulkDB")
const updateGameRating = require("./updateGameRating")
const reviews = require("./reviews")
const getReviews = require("./getReviews")
const forgotPassword = require("./forgotPassword")
const loginGoogles = require("./loginGoogles")





// Configurar los routers
router.use("/games", getGamesNameRouter);
router.use("/games/update", putGameRouter);
router.use("/games", postGamesRouter);
router.use("/games", createBulkDB);
router.use("/games", getGamesIdRouter);
router.use("/games", deleteGameRouter);
router.use("/games/platforms", filteredPlatforms);
router.use("/games/order", sortedGames);
router.use("/genres", getGenresRouter);
router.use("/user", createUser);
router.use("/user", getuserid);
router.use("/user", getuser);
router.use("/user", deleteUser);
router.use("/user/admin", updateUserAdmin);
router.use("/user/login", loginUser);
router.use("/login", login);
router.use("/user/update", updateUser);
router.use("/", payment);
router.use("/sales", getSales);
router.use("/sales", getSalesId);
router.use("/cart", createCart);
router.use("/reviews", reviews);
router.use("/reviews", getReviews);
router.use(registroRouter);
router.use(carritoRouter);
router.use("/games", bulkCreateDescriptionsGames);
router.use("/games", updateGameRating);
router.use("/forgotPassword", forgotPassword)
router.use("/loginGoogle", loginGoogles);




module.exports = router;

