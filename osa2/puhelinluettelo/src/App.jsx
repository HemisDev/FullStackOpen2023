import { useState, useEffect } from 'react'
import {Phonebook} from './components/Phonebook'
import personService from './services/webphonebook'
import {PhoneFilter, NewPhoneItemDialog} from './components/DialogComponents'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setPhoneNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {    
    personService.getAll()
      .then(response => {        
        setPersons(response)
      })
  }, [])

  const resetValues=()=> {
    setNewName('')      
    setPhoneNumber('')   
  }

  const addContact = (event) => {    
    event.preventDefault()
    const newNameObject = {
      name: newName,
      phone: newPhone            
    }    
    if(newNameObject.name.length !==0)
    {
      if(!persons.find(person=> person.name === newNameObject.name))
      {
        personService.create(newNameObject)
        .then(response => {
          setPersons(persons.concat(response))
        })       
        resetValues()        
      }
      else
      {
        if(newNameObject.phone.length !==0)
        {
          if(persons.find(person => person.name === newNameObject.name && person.phone.length ===0 ))
          {
            const person = persons.find((person) =>  person.name === newNameObject.name); 
            const updatedPerson = {...person, phone: newNameObject.phone, id: person.id}            
            personService
              .update(updatedPerson.id, updatedPerson)
              .then(returnedObject=>{
                setPersons(persons.map(person=>person.id !==updatedPerson.id ? person: returnedObject))              
            })            
            resetValues()            
          }
          else
          {
            if(window.confirm(`${newNameObject.name} is already added to phonebook, replace the old number with a new one?`))
            {
              const person = persons.find((person) =>  person.name === newNameObject.name); 
              const updatedPerson = {...person, phone: newNameObject.phone, id: person.id}    
              personService
                .update(updatedPerson.id, updatedPerson)
                .then(returnedObject=>{
                  setPersons(persons.map(person=>person.id !==updatedPerson.id ? person: returnedObject))  
                })
                resetValues()       
            }            
          }
        }
        else
        {
          alert(`Please define a phonenumber for person`)
        }
      }
    }
  }
  const handleNameChange = (event) => {    
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }
  const handlePhoneDelete = personId => {    
    const deletePerson = persons.find(p=>p.id === personId)    
    if(window.confirm(`Delete ${deletePerson.name}? `)){    
      personService.deleteSingle(personId)        
      setPersons(persons.filter(person=>person.id !==personId))    
    }
  }
  return (
    <div>
      <PhoneFilter 
        title="Phonebook"
        filter={filterValue}
        filterHandler={handleFilterChange}  
      />
      <NewPhoneItemDialog
        title="add a new"
        onSubmit={addContact} 
        namebox={newName} 
        phonebox={newPhone} 
        nameHandler={handleNameChange} 
        phoneHandler={handlePhoneChange}        
      />                  
      <Phonebook 
        title="Numbers"
        persons={persons}
        filter={filterValue}      
        delfunction={handlePhoneDelete}
      />
    </div>
  )

}

export default App