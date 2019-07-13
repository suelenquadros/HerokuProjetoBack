require('dotenv-safe').load()
const mongoose = require("mongoose");
// string de conexão:
// mongodb://dominio:porta/nome_database
const MONGO_URL = process.env.MONGODB_URI;

function connect () {
  mongoose.connect(MONGO_URL,
    { useNewUrlParser: true },
    function (error) {
      if(error) {
        console.error("Deu erro: ", error)
      } else {
        console.log("Conectamos no mongodb!!! o/")
      }
    }
  );
}

module.exports = { connect }

