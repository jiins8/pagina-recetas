const mongoose = require('mongoose');
const {ObjectId} = require('mongodb')

const reservaSchema = new mongoose.Schema( {
    user_id: mongoose.Schema.Types.ObjectId,
    data_reserva: String,
    esdeveniment_id: mongoose.Schema.Types.ObjectId,
    num_entrada: String,
    pagades: String
});
const Reserva = mongoose.model('Reserva', reservaSchema)
module.exports = Reserva
