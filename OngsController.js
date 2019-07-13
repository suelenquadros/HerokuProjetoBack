const { connect } = require('./OngsRepository')
const ongsModel = require('./OngsSchema')

connect() // para conectar no mongoDB

const getAll = async () => {
  return ongsModel.find((error, ongs) => {
    return ongs
  })
}

const getById = (id) => {
  return ongsModel.findById(id)
}

const add = (ong) => {
  const novaOng = new ongsModel(ong)
  return novaOng.save()
}

const remove = (id) => {
  return ongsModel.findByIdAndDelete(id)
}

const update = (id, ong) => {
  return ongsModel.findByIdAndUpdate(
    id,
    { $set: ong },
    { new: true }, // RETORNAR A COMIDA JA ATUALIZADA NO CALLBACK
  )
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update
}
