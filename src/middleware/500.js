'use strict';

const Q = require('@nmq/q');

module.exports = (err, req, res, next) => {
  Q.publish('api', 'error', err);
  let error = { error: err };
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();
};