const express = require('express');
const router = express.Router();
const { home, addHero, addHeroPost } = require('../auth/Home');
const { addType, addTypepost } = require('../auth/AddType');
const { update, updatePost } = require('../auth/update');
const { Detail, DetailIndex, deletPost } = require('../auth/detail');
const { login, loginPost, logout } = require('../auth/login');
const { register, registerPost, checkAuth } = require('../auth/register');
const upload = require('../src/middleware/uploadFile');

router.get("/", home);

router.get("/addHero", checkAuth, addHero);
router.post("/addHero", upload.single('imageHero'), addHeroPost);

router.get("/addType", addType);
router.post("/addType", addTypepost);

router.get("/Detail", Detail);
router.get("/Detail/:id", DetailIndex);

router.post("/delete/:id", checkAuth, deletPost);

router.get("/update/:id", checkAuth, update);
router.post("/update/:id", upload.single('image'), checkAuth, updatePost);

router.get("/login", login);
router.post("/login", loginPost);

router.get("/register", register);
router.post("/register", registerPost);

router.get('/logout', logout);

module.exports = router;
