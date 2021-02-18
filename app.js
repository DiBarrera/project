require('dotenv').config();

const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

// Routes

const indexRouter = require('./routes/index.routes');
const authRouter = require('./routes/auth.routes');
const adminRouter = require('./routes/admin.routes');
// const userRouter = require('./routes/user.routes');
// const designsRouter = require('./routes/designs.routes');

const app = express();

// require database configuration
require('./configs/db.config');
require('./configs/session.config')(app);

// Middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes middleware
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', adminRouter);
// app.use('/', userRouter);
// app.use('/', designsRouter);

// Express View engine setup
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

const index = require('./routes/index.routes');
app.use('/logout', index);

module.exports = app;
