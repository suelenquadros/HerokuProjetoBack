const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const OngsSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  nome: { type: String, required: true },
  telefone: { type: String, required: true },
  endereco: { type: String, required: true },
  ramo: { type: String, required: true },
  email: { type: String, required: true },
  descricao: { type: String }, 
  foto: { type: String}
})


const ongsModel = mongoose.model("ongs", OngsSchema);

module.exports = ongsModel;
