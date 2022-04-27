// importing mongoose module
const mongoose = require('mongoose');

var csvschema = new mongoose.Schema({
  fileName: String,
  fileData: Buffer,
}, {
  timestamps: true
});

// exporting CSV schema
module.exports = mongoose.model('CSV', csvschema);