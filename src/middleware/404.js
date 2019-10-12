'use strict';

const Q = require('@nmq/q');

module.exports = (req,res,next) => {
  Q.publish('api', 'not found');
  let error = { error: 'Resource Not Found' };
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};
