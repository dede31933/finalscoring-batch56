const { Sequelize, QueryTypes } = require('sequelize');
const config = require('../config/config.json');
const { Type, Hero } = require('../models');
// const sequelize = new Sequelize(config.development);

function Detail(req, res) {
  res.render("Detail", { isLogin: req.session.isLogin, user: req.session.user })
}

async function DetailIndex(req, res) {
  const { id } = req.params;
  try {
    const hero = await Hero.findByPk(id);

    if (!hero) {
      return res.status(404).send('Hero not found');
    }

    const types = await Type.findAll();

    const heroWithTypeName = {
      ...hero.toJSON(),
      typeName: types.find(type => type.id === hero.type_id)?.name || 'Unknown'
    };

    res.render('Detail', {
      Hero: heroWithTypeName,
      types,
      isLogin: req.session.isLogin,
      user: req.session.user
    });
  } catch (error) {
    console.error('Error fetching hero details:', error);
    res.status(500).send('Failed to fetch hero details');
  }
}

async function deletPost(req, res) {
  const { id } = req.params;
  try {
    const hero = await Hero.findByPk(id);
    if (!hero) {
      return res.status(404).send("Hero not found");
    }
    if (hero.user_id !== req.session.user.id) {
      req.flash("danger", "You are not authorized to delete this hero.");
      return res.redirect(`/Detail/${id}`);
    }
    await Hero.destroy({ where: { id } });

    res.redirect('/');
  } catch (error) {
    console.error('Error when deleting hero:', error);
    res.status(500).send('Failed to delete hero');
  }
}

module.exports = { Detail, deletPost, DetailIndex }
