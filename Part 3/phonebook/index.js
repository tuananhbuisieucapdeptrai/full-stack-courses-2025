require('dotenv').config()
const express = require('express')
var cors = require('cors')
const app = express()
app.use(express.json())
const morgan = require('morgan')
morgan.token('body', (req) => JSON.stringify(req.body || {}));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '))
app.use(cors())
app.use(express.static('dist'))



const Person = require('./models/phone')



const PORT = process.env.PORT 
app.listen(PORT)
console.log(`Server running on port ${PORT}`)





app.get('/api/persons',(request,response)=>{
    Person.find({}).then((person)=>{
      response.json(person)
    })
})

app.get('/info', async (request,response)=>{
    const today = new Date()
    const len   = await Person.countDocuments({})

    response.send(
        `<div><p>Phonebook has info for ${len} people</p><p>${today}</p></div>`)
})


app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.findById(id).then((person)=>
      response.json(person)
    )
    
})



app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response,next) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
    if (!body.number) {
        return response.status(400).json({ 
          error: 'number missing' 
        })
      }


    const person = new Person({
      name : body.name,
      number: body.number,
      
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    }).catch(error => next(error))
    
})


app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findOneAndUpdate(name,number).then(result => {
    response.status(204).end()
  }).catch(error => next(error))
})





const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })

  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)