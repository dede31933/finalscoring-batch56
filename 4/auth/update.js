const { Hero, Type } = require('../models');

async function update(req, res) {
  const { id } = req.params;
  try {
    const hero = await Hero.findByPk(id);
    if (!hero) {
      return res.status(404).send("Hero not found");
    }
    const types = await Type.findAll();
    res.render('update', {
      Hero: hero,
      types: types,
      isLogin: req.session.isLogin,
      user: req.session.user
    });
  } catch (error) {
    console.error('Error fetching hero details for update:', error);
    res.status(500).send('Failed to fetch hero details for update');
  }
}

async function updatePost(req, res) {
  const { id } = req.params;
  const { nameHero, TypeHero } = req.body;
  console.log('File info:', req.file);
  try {
    const hero = await Hero.findByPk(id);
    if (!hero) {
      return res.status(404).send('Hero not found');
    }
    if (hero.user_id !== req.session.user.id) {
      return res.status(403).send('kembali lah nanti');
    }

    hero.name = nameHero;
    hero.type_id = TypeHero;
    if (req.file) {
      hero.image = req.file.filename;
    }
    await hero.save();

    res.redirect(`/Detail/${id}`);
  } catch (error) {
    console.error('Error updating hero:', error);
    res.status(500).send('Failed to update hero');
  }
}

module.exports = { update, updatePost };