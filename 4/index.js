const express = require('express');
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/src/assets/css", express.static(path.join(__dirname, "src/assets/css")));
app.use("/src/assets/image", express.static(path.join(__dirname, "src/assets/image")));
app.use("/src/uploads", express.static(path.join(__dirname, "src/uploads")));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

app.use('/', require('./Routing/RdmR.JS'));

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
