const mongoose = require('mongoose');
const {ObjectId} = require('mongodb')

const recinteSchema = new mongoose.Schema( {
    nomRecinte: String,
    direccio: String,
    superficie: String,
    foto: String

});
const Recinte = mongoose.model('Recinte', recinteSchema)
module.exports = Recinte

