require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { corsOptionsDelegate } = require('./src/middlewares/cors')

const routes = require('./src/routes')

const app = express();
const session = require('express-session');
// tes
const path = require('path')

app.disable('x-powered-by');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: true
}));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers',"*");
  res.header("Access-Control-Allow-Credentials", "true")
  next();
});
app.set('trust proxy', true)

// CORS
// app.options('*', cors(corsOptionsDelegate))
// app.use(cors(corsOptionsDelegate));
// app.options('*', cors())
// app.use(cors())

app.use(
  bodyParser.urlencoded({
    limit: '100mb',
    extended: true,
    parameterLimit: 1000000
  })
);
app.use(bodyParser.json({ limit: '100mb' }));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/video', express.static(__dirname + '/video'));



// app.use('*', cors())
// app.use(express.static('public'));

app.use(`${process.env.URL_PREFIX}/`, routes());


// console.log(process.env)
module.exports = app