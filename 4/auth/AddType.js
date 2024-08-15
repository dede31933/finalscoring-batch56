const { Type } = require('../models');

async function addType(req, res) {
  try {
    res.render('addType', { isLogin: req.session.isLogin, user: req.session.user });
  } catch (error) {
    console.error('Error rendering addType page:', error);
    res.status(500).send('Failed to render addType page');
  }
}

async function addTypepost(req, res) {
  const { typeName } = req.body;
  console.log('Received Type Data:', { typeName });
  try {
    await Type.create({ name: typeName });
    res.redirect('/addType');
  } catch (error) {
    console.error('Error adding type:', error);
    res.status(500).send('Failed to add type');
  }
}

module.exports = { addType, addTypepost };
