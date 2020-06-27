var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var axios = require("axios").default;
var fs = require("fs");
var constants = require("./constants");

var skinRenderer = require("./skinrenderer");

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.post("/generate", (req, res, next) => {
  if (!req.body.name) {
    res.render("error", {message: "Please enter a name!", error: {status: 500, stack: ""}});
    next();
    return;
  }

  var name = req.body.name;
  var newName = name;
  var taken = false;

  var skinFile = constants.skins[Math.floor(Math.random() * constants.skins.length)];

  if (req.body.levels) {
    if (req.body.levels.includes("vowels")) {
      newName = newName.replace(/[aeiou]+?/g, Math.round(Math.random()) === 1 ? 'x' : 'q');
    }
    if (req.body.levels.includes("prefix")) {
      var prefix = constants.prefixes[Math.floor(Math.random() * constants.prefixes.length)];
      newName = prefix + newName;
    }
    if (req.body.levels.includes("suffix")) {
      var suffix = constants.suffixes[Math.floor(Math.random() * constants.suffixes.length)];
      newName = newName + suffix;
    }
  } else {
    res.render("error", {message: "Please select at least 1 \"OG\"-ifier feature!", error: {status: 500, stack: ""}});
    next();
    return;
  }

  axios.get(`https://api.mojang.com/users/profiles/minecraft/${newName}`)
      .then((response) => {
        if(response.statusText !== "No Content") {
          taken = true;
        }
      })
      .finally(() => {
        res.render("done", {newName: newName, oldName: name, nameTaken: taken, skin: skinFile});
        taken = false;
      });
});

app.get("/renderSkin", (req, res, next) => {
  var skinFile = req.query.skinFile;

  // always slim because steve -> alex looks better than alex -> steve
  skinRenderer.draw_model(0, "public/images/" + skinFile, 6.4, true, true, true, (err, buffer) => {
    res.json(buffer);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
