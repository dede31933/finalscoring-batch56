const { User } = require('../models');
const bcrypt = require('bcrypt');

function register(req, res) {
  res.render("register");
}

async function registerPost(req, res) {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      req.flash("danger", "Register Failed: Email Already Used!");
      return res.redirect("/register");
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    req.flash("success", "Register Success!");
    res.redirect("/login");
  } catch (error) {
    console.error("Error when registering user:", error);
    req.flash("danger", "Register Failed: Internal Server Error");
    res.redirect("/register");
  }
}
function checkAuth(req, res, next) {
  if (req.session.isLogin) {
    next();
  } else {
    req.flash("danger", "kamu harus login dulu");
    res.redirect("/login");
  }
}

module.exports = { register, registerPost, checkAuth }