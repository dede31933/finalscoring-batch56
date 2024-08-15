const { Sequelize, QueryTypes } = require('sequelize');
const config = require('../config/config.json');
const { Type, Hero } = require('../models');
const sequelize = new Sequelize(config.development);

async function home(req, res) {
  try {
    console.log('User Session in Home:', req.session.user);
    const heroes = await sequelize.query('SELECT * FROM "heroes_tb"', { type: QueryTypes.SELECT });
    const types = await Type.findAll();

    const typeMap = {};
    types.forEach(type => {
      typeMap[type.id] = type.name;
    });

    const heroesWithTypeNames = heroes.map(hero => ({
      ...hero,
      typeName: typeMap[hero.type_id] || 'Unknown'
    }));

    res.render('index', { Hero: heroesWithTypeNames, isLogin: req.session.isLogin, user: req.session.user });
  } catch (error) {
    console.error('Error fetching heroes:', error);
    res.status(500).send('Failed to fetch heroes');
  }
}

async function addHero(req, res) {
  try {
    const types = await Type.findAll();
    res.render('addHero', { Type: types, isLogin: req.session.isLogin, user: req.session.user });
  } catch (error) {
    console.error('Error fetching types:', error);
    res.status(500).send('Failed to fetch types');
  }
}

async function addHeroPost(req, res) {
  console.log('File info:', req.file);
  console.log('Form data:', req.body);

  const { nameHero, TypeHero } = req.body;
  const imageHero = req.file ? req.file.filename : 'default.jpg';

  console.log('Received Data:', { nameHero, TypeHero, imageHero });

  if (!nameHero || !TypeHero) {
    return res.status(400).send('Name and type are required.');
  }

  const user_id = req.session.user.id;
  const newHero = {
    name: nameHero,
    type_id: TypeHero,
    image: imageHero,
    user_id: user_id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (req.file) {
    newHero.image = req.file.filename;
  }

  try {
    await Hero.create(newHero);
    res.redirect('/');
  } catch (error) {
    console.error('Error adding hero:', error);
    res.status(500).send('Failed to add hero');
  }
}

module.exports = { home, addHero, addHeroPost };
