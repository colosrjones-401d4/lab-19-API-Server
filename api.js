'use strict';

require('dotenv').config();

const express = require('express');
const Q = require('@nmq/q/client');

const app = express();

app.get('/database', response => {
  let data ={
    name: 'read',
    message: 'Get response',
  };
  Q.publish('database', 'read', JSON.stringify(data));
  response.setEncoding('get');
});

app.post('/database', response => {
  let data = {
    name: 'create',
    message: 'Post response',
  };
  Q.publish('database', 'create', data);
  response.setEncoding('post');
});

app.put('/database', response => {
  let data = {
    name: 'update',
    message: 'Put response',
  };

  Q.publish('database', 'update', data);
  response.setEncoding('put');
});

app.delete('/database', response => {
  let data = {
    name: 'delete',
    message: 'Delete Response',
  };
  Q.publish('database', 'delete', data);
  response.setEncoding('delete');
});

app.use( response => {
  let data = {
    name: 'error',
    message: 'Oh no',
  };
  Q.publish('database', 'error', data);
});

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT ||3000;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};