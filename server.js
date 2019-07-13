const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const controller = require('./OngsController')
const PORT = process.env.PORT || 3000

const servidor = express()
servidor.use(cors())
servidor.use(bodyParser.json())

servidor.get('/ongs', (request, response) => {
  controller.getAll()
    .then(ongs => response.send(ongs))
})

servidor.get('/ongs/:id', (request, response) => {
  const id = request.params.id
  controller.getById(id)
    .then(ong => {
      if(!ong){ // comida === null || comida === undefined
        response.sendStatus(404) // comida nao encontrada
      } else {
        response.send(ong) // Status default é 200
      }
    })
    .catch(error => {
      if(error.name === "CastError"){
        response.sendStatus(400) // bad request - tem algum parametro errado
      } else {
        response.sendStatus(500) // deu ruim, e nao sabemos oq foi
      }
    })
})

servidor.post('/ongs', (request, response) => {
  controller.add(request.body)
    .then(ong => {
      const _id = ong._id
      response.send(_id)
    })
    .catch(error => {
      if(error.name === "ValidationError"){
        response.sendStatus(400) // bad request
      } else {
        response.sendStatus(500)
      }
    })
})

servidor.patch('/ongs/:id', (request, response) => {
  const id = request.params.id
  controller.update(id, request.body)
    .then(ong => {
      if(!ong) { response.sendStatus(404) } // nao encontrei a comida
      else { response.send(ong) } // o status default 200
    })
    .catch(error => {
      if(error.name === "MongoError" || error.name === "CastError"){
        response.sendStatus(400) // bad request
      } else {
        response.sendStatus(500)
      }
    })
})

servidor.delete('/ongs/:id', (request, response) => {
  controller.remove(request.params.id)
    .then(ong => {
      if(ong === null || ong === undefined){ // if(!comida)
        response.sendStatus(404) // not found
      } else {
        response.sendStatus(204)
      }
    })
    .catch(error => {
      if(error.name === "CastError"){
        response.sendStatus(400) //bad request
      } else {
        response.sendStatus(500)
      }
    })
})


servidor.listen(PORT)
console.info(`Rodando na porta ${PORT}`)
