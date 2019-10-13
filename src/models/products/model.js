'use strict';

const Model = require('../mongo-model.js');
const schema = require('./products-schema.js');

class Products extends Model {}

module.exports = new Products(schema);