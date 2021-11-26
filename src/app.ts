import  dotenv  from "dotenv"
dotenv.config();
import express from "express"
import helmet from "helmet"
import path from "path"
import cookieParser from "cookie-parser"
import fs from "fs"
import loger from "morgan"
import { mainroutes } from './routes/page';
const FileStreamRotator = require('file-stream-rotator');

import session from 'express-session';
import MongoDBStore from "connect-mongodb-session"
const sessionStorage = MongoDBStore(session);
var store = new sessionStorage({
    uri: 'mongodb://localhost:27017/connect_mongodb_session',
    collection: 'mySessions'
  });
const app = express();
const logDirectory = path.join(__dirname, 'log');
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
  })
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  app.use(cookieParser());
  app.use('/', mainroutes);
  app.use(helmet());
  app.use(loger(':date[iso] :method :remote-addr :url :status :response-time ', {stream: accessLogStream }));
  
  // Catch errors
  store.on('error', function(error) {
    console.log(error);
  });
  
  app.use(require('express-session')({
    secret: 'This is a secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true
  }));