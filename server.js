const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const controller = require('./ComidasController')

const servidor = express()
servidor.use(cors())
servidor.use(bodyParser.json())

servidor.get('/comidas', async (request, response) => {
  controller.getAll()
    .then(comidas => response.send(comidas))
})

servidor.get('/comidas/:id', (request, response) => {
  const id = request.params.id
  controller.getById(id)
    .then(comida => {
      if(!comida){ // comida === null || comida === undefined
        response.sendStatus(404) // comida nao encontrada
      } else {
        response.send(comida) // Status default é 200
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

servidor.post('/comidas', (request, response) => {
  controller.add(request.body)
    .then(comida => {
      const _id = comida._id
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

servidor.patch('/comidas/:id', (request, response) => {
  const id = request.params.id
  controller.update(id, request.body)
    .then(comida => {
      if(!comida) { response.sendStatus(404) } // nao encontrei a comida
      else { response.send(comida) } // o status default 200
    })
    .catch(error => {
      if(error.name === "MongoError" || error.name === "CastError"){
        response.sendStatus(400) // bad request
      } else {
        response.sendStatus(500)
      }
    })
})

servidor.delete('/comidas/:id', (request, response) => {
  controller.remove(request.params.id)
    .then(comida => {
      if(comida === null || comida === undefined){ // if(!comida) 
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


servidor.listen(3000)
console.log("servidorzinho rodando na porta 3000")
