const mongoose = require('mongoose')



const password = process.argv[2]
const name     = process.argv[3]
const number   = process.argv[4]

const url = `mongodb+srv://tuananhbui0703_db_user:${password}@tuananhbuidepzaivcl.6dxbk8b.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=tuananhbuidepzaivcl`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    Person.find({}).then(result => {
        console.log("phonebook: \n")
        result.forEach(person => {
          console.log(`${person.name} ${person.number} `)
        })
        mongoose.connection.close()
      })
    
}
else{const person = new Person({
    name: name,
    number: number,
  })
  
  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })}


 