'use strict';

const Model = require('../models/memory-model');

const schema = {
  _id: {required:true},
  name: {required:true},
};

class Categories extends Model {}
