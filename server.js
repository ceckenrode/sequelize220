//express setup
var express = require('express');
var app = express();
var PORT = process.env.NODE_ENV || 3000;

//database setup
var Sequelize = require('sequelize');
var connection = new Sequelize('chocolate', 'root');

var chocolate = connection.define('Satisfaction', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  level: {
    type: Sequelize.INTEGER,
     }
});

chocolate.create({name: 'Dark Chocolate', level: 8});

//handlebars setup
var expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//routes
app.get('/', function(req, res) {
    res.render('index');
});

// database connection via sequelize
connection.sync().then(function() {
  app.listen(PORT, function() {
      console.log("Listening on:" + PORT)
  });
});