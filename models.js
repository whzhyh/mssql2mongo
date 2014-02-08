var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
    QQNum: Number,
    Nick: String,
    QunNum: Number
})

mongoose.model('Group', GroupSchema)