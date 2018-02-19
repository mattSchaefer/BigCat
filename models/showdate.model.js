var mongoose = require('mongoose');
var ShowDateSchema = mongoose.Schema({
    title: String,
    venu: String,
    address: String,
    date: Date
});
module.exports = mongoose.model('ShowDate', ShowDateSchema);
