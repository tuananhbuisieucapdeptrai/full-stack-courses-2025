const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')
morgan.token('body', (req) => JSON.stringify(req.body || {}));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '))




const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)


let persons = 
[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons',(request,response)=>{
    response.json(persons)
})

app.get('/info',(request,response)=>{
    const today = new Date()
    const len   = persons.length

    response.send(
        `<div><p>Phonebook has info for ${len} people</p><p>${today}</p></div>`)
})


app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})



app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(note => note.id !== id)
  
    response.status(204).end()
  })


const generateId = () => {
    const id =  Math.floor(Math.random() * 30)
    return String(id + 1)
}


app.post('/api/persons', (request, response) => {
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

    const data = persons.filter(person => person.name == body.name)

    if (data.length!=0){
        return response.status(400).json({ 
            error: 'name must be unique' 
          })
    }
    const person = {
      id: generateId(),
      name : body.name,
      number: body.number,
      
    }
  
    persons = persons.concat(person)
  
    response.json(person)
    
})


