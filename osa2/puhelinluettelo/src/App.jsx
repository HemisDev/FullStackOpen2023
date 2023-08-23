import { useState, useEffect } from 'react'
import {Phonebook} from './components/Phonebook'
import personService from './services/webphonebook'
import {PhoneFilter, NewPhoneItemDialog} from './components/DialogComponents'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setPhoneNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [infoMessage, setInfoMessage] = useState([])

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

  const addNotification =({message,messageType}) =>{    
    const newMessage ={
      message:message,
      messageType:messageType
    }
    setInfoMessage(newMessage)
    setTimeout(() => {
      setInfoMessage([])
    }, 2000)
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
          addNotification({message:`Added person ${response.name} to phonebook`,messageType:"info"})
        })       
        .catch(error=>{
          addNotification({message: `Could not add person ${newNameObject.name} to phonebook. error: ${error}`, messageType:"error"})                                    
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
                addNotification({message:`Added phonenumber to person ${returnedObject.name}`,messageType: "info"})
              })
              .catch(error=>{
                if(error.response && error.response.status ===404)
                {
                  addNotification({message: `Could not add phonenumber to person: ${person.name}. Person was already deleted!`, messageType:"error"})                                    
                  personService.getAll()
                    .then(response => {        
                      setPersons(response)
                    })
                }
                else
                {
                  addNotification({message: `Could not add phonenumber to person: ${person.name}. error: ${error}`, messageType:"error"})                                    
                }
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
                  addNotification({message:`Replaced phonenumber of person ${returnedObject.name}`,messageType:"info"})
                })
                .catch(error=>{
                  if(error.response && error.response.status ===404)
                  {
                    addNotification({message: `Could not update phonenumber to person: ${person.name}. Person was already deleted!`, messageType:"error"})                                    
                    personService.getAll()
                    .then(response => {        
                      setPersons(response)
                    })
                  }
                  else
                  {
                    addNotification({message: `Could not update phonenumber to person: ${person.name}. error: ${error}`, messageType:"error"})                                    
                  }
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
      addNotification({message:`Removed ${deletePerson.name} from phonebook`, messageType:"warning"})        
      setPersons(persons.filter(person=>person.id !==personId))    
    }
  }
  return (
    <div>
      <PhoneFilter 
        title="Phonebook"
        filter={filterValue}
        filterHandler={handleFilterChange}
        message={infoMessage.message}         
        messageType={infoMessage.messageType}
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