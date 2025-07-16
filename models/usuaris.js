const mongoose = require('mongoose');
const {ObjectId} = require('mongodb')

const usuariSchema = new mongoose.Schema( {
    nom: String,
    cognom: String,
    email: String,
    codi_postal: String,
    password: String,
    telefono: String,
    rol: String
});
const Usuari = mongoose.model('Usuari', usuariSchema)
module.exports = Usuari

