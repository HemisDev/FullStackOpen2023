import { useState } from 'react'
import {Phonebook} from './components/Phonebook'
import {PhoneFilter, NewPhoneItemDialog} from './components/DialogComponents'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setPhoneNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

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
        setPersons(persons.concat(newNameObject))
        setNewName('')      
        setPhoneNumber('')      
      }
      else
      {
        console.log(newNameObject.phone)
        if(newNameObject.phone.length !==0)
        {
          if(persons.find(person => person.name === newNameObject.name && person.phone.length ===0 ))
          {
            const updatedPerson = persons.map((person) => 
            person.name === newNameObject.name ? {...person, phone: newNameObject.phone} : person)
            setPersons(updatedPerson)
            setNewName('')      
            setPhoneNumber('')      
          }
          else
          {
            alert(`${newName} has already a number in the phonebook, replacing numbers is not allowed`)
          }
        }
        else
        {
          alert(`${newName} is already in the phonebook`)
        }
      }
    }
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setPhoneNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterValue(event.target.value)
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
      />
    </div>
  )

}

export default App