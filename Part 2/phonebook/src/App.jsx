import { useEffect } from 'react'
import { useState } from 'react'
import phoneService from './services/phone'



const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='message'>
      {message}
    </div>
  )
}


const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}


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
      <div>
        <p key={person.name.length+person.number.length}>{person.name} {person.number} </p>
        <button onClick={()=>props.handleDelete(person)}>delete</button>
      </div>
      )}
    </div>
  )
}



const App = () => {
  
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [filter,setFilter] = useState('')
  const [message,setMessage] = useState(null)
  const [check, setCheck] = useState(0)
  const [error, setErrorMessage] = useState(null)

  const handleDelete = (input) => {
    if(window.confirm(`Delete ${input.name}?`)){
      phoneService.erase(input.id).then((data)=>{
        setPersons(persons.filter(person=>person.id!=data.id))
      })
    }
   
  }

  useEffect(()=>{
      phoneService.getAll().then((initialpersons)=>setPersons(initialpersons))
  }, [])
  
  /*
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
    else{
      
      phoneService.create(object).then((data)=>
        {setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')})
      }
    }
    */

    const addPerson = (event)=>{
      event.preventDefault()
      const object = { name: newName, number: newNumber}
      var bool = false
      for (const person of persons){
        if(person.name == newName){
          bool = true
        }
      }
      setCheck(0)
      setTimeout(() => {
        setMessage(`Added ${newName}`)
      }, 0)
      setTimeout(()=>{
        setCheck(check+1)
      },5000)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      if (bool) {
        const id_1 = persons.filter(person=>person.name == newName)[0].id
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)){
          phoneService.update(id_1,object).then((data) => {
              
            setPersons(persons.map(p => p.id !== id_1 ? p : data))
            setNewName('')
            setNewNumber('')
          }).catch(error => {
            setErrorMessage(
              `Information of ${newName} has already removed from the server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })}
      }
      else{
        
        phoneService.create(object).then((data)=>
          {setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')}).catch(error => {
            setErrorMessage(
              `Information of ${newName} has already removed from the server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
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
      {check%2 == 0  && <Notification message={message}/>}
      <Error message={error}/>
      <Filter filter = {filter} function = {handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNoteChange={handleNoteChange} newNumber={newNumber} handlePhoneChange={handlePhoneChange}/>
      <h2>Numbers</h2>
      <div>debug: {newName}</div>
      
      
      <Person personToShow={personToShow} handleDelete = {handleDelete}/>
    </div>
  )
}

export default App