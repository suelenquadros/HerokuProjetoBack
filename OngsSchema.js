const mongoose = require("mongoose");
// cada schema equivale collection
const Schema = mongoose.Schema;
const OngsSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  nome: { type: String, required: true },
  telefone: { type: Number, required: true },
  endereco: { type: String, required: true },
  ramo: { type: String, required: true },
  descricao: { type: String }, // opcional
  foto: { type: String}
})

// é a nossa coleção de comidas
const ongsModel = mongoose.model("ongs", OngsSchema);

module.exports = ongsModel;
