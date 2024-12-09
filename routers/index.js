const { HomePublic, details } = require("../controllers/ArtPublicController");
const {
  HomePrivate,
  PostArt,
  DetailsArt,
  UpdateArtById,
  DeleteArt,
  UpdateArt,
} = require("../controllers/ArtPrivateController");

const {
  OriginAll,
  OriginCreate,
  OriginUpdate,
} = require("../controllers/OriginController");

const {
  register,
  login,
  GoogleLogin,
} = require("../controllers/UserController");

const errorHandling = require("../helper/errorHanler");
const authentication = require("../middleWare/Authentication");
const { Admin, Member } = require("../middleWare/Authorization");
const { gemini } = require("../controllers/geminiController");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});


router.post("/register", register);
router.post("/login", login);
router.post("/login/google", GoogleLogin);

router.get("/public/allArts/:id", details);
router.get("/public/allArts", HomePublic);

router.post("/give-me-answer", gemini);

router.use(authentication);
router.get("/user/get/private/home", HomePrivate);
router.post("/user/post/private/arts", PostArt);
router.get("/user/get/private/arts/:id", DetailsArt);
router.put("/user/update/private/arts/:id", Admin, UpdateArtById);
router.delete("/user/delete/private/arts/:id", Admin, DeleteArt);
router.patch("/user/patch/private/arts/:id/image-url", Admin, UpdateArt);

router.get("/user/get/private/origins", OriginAll);
router.post("/user/post/private/by/origins", OriginCreate);
router.put("/user/put/private/origins/by/:id", Admin, OriginUpdate);

router.use(errorHandling);

module.exports = router;
