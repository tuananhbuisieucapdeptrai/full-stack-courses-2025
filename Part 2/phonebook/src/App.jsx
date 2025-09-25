import { useState } from 'react'

const Filter = (props)=>{
  return (
    <div>
      <input value={props.filter} onChange={props.function}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handleNoteChange}/>
        </div>
        <div>
          number <input value={props.newNumber} onChange={props.handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Person = (props)=> {
  return (
    <div>
      {props.personToShow.map(person=>
        <p key={person.name.length}>{person.name} {person.number} </p>
      )}
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:'040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')

  const [filter,setFilter] = useState('')


  

  const addPerson = (event)=>{
    event.preventDefault()
    const object = { name: newName, number: newNumber}
    var bool = false
    for (const person of persons){
      if(person.name == newName){
        bool = true
      }
    }
    if (bool) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else{setPersons(persons.concat(object))
      setNewName('')
      setNewNumber('')
    }
  
  }

  const handleNoteChange=(event)=>{
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personToShow = persons.filter(person=>(person.name.includes(filter)||person.name.includes(filter.charAt(0).toUpperCase()+filter.slice(1))))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter = {filter} function = {handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNoteChange={handleNoteChange} newNumber={newNumber} handlePhoneChange={handlePhoneChange}/>
      <h2>Numbers</h2>
      <div>debug: {newName}</div>
      
      
      <Person personToShow={personToShow}/>
    </div>
  )
}

export default App