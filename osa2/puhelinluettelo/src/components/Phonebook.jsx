
const Person =({personName,phone}) => (<p>{personName} - {phone}</p>)

const FilteredPhoneBook =({persons,filter}) => {
    const filteredPhoneBook = persons.filter(person => person.name.toLowerCase().includes(filter))
    return(
    <div>
        {filteredPhoneBook.length === 0 ? (
        <p>No matching contacts!</p>
        ): (
        filteredPhoneBook.map(person => 
            <Person key={person.name} personName={person.name} phone={person.phone}/>)
        )}  
    </div>
    )
}

export const Phonebook = ({title, persons, filter}) => {
    if(filter.length === 0)
    {
      return(
        <div>
          <h2>{title}</h2>
          {persons.map(person => <Person key={person.name} personName={person.name} phone={person.phone}/>)}    
        </div> 
      )
    }          
    return(
      <div>
        <h2>{title}</h2>
        <FilteredPhoneBook persons={persons} filter={filter}/>
      </div> 
    )  
}

export default Phonebook