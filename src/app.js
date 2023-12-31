const Koa = require('koa');
const koaBody = require('koa-body');
const KoaLogger = require('koa-logger');
const cors = require('@koa/cors');
const router = require('./routes');
const orm = require('./models');
const dotenv = require('dotenv');
const http =require('http');



const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  });

const app = new Koa();

app.use(cors(({ credentials: true })));

app.context.orm = orm;

app.use(KoaLogger());
app.use(koaBody());

app.use(router.routes());


module.exports = app;