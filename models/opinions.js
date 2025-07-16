const mongoose = require('mongoose');
const {ObjectId} = require('mongodb')

const opinionSchema = new mongoose.Schema( {
    user_id: mongoose.Schema.Types.ObjectId,
    esdeveniment_id: mongoose.Schema.Types.ObjectId,
    opinio: String,
    puntuacio: Number,

});
const Opinion = mongoose.model('Opinion', opinionSchema)
module.exports = Opinion

