const mongoose = require('mongoose');
const {ObjectId} = require('mongodb')

const esdevenimentSchema = new mongoose.Schema( {
    nom: String,
    data: String,
    hora: String,
    nomRecinte: mongoose.Schema.Types.ObjectId,
    descripcio: String,
    preu: Number,
    aforament: Number,
    foto: String
});
const Esdeveniment = mongoose.model('Esdeveniment', esdevenimentSchema)
module.exports = Esdeveniment

