
const Person =({person, handleDelete}) => {
  return(  
    <p>
    {person.name} - {person.phone}
    <button onClick={handleDelete}>delete</button>
    </p>
)
}

const FilteredPhoneBook =({persons,filter,delfunction}) => {
    const filteredPhoneBook = persons.filter(person => person.name.toLowerCase().includes(filter))
    return(
    <div>
        {filteredPhoneBook.length === 0 ? (
        <p>No matching contacts!</p>
        ): (
        filteredPhoneBook.map(person => 
            <Person key={person.id} person={person} handleDelete={() =>delfunction(person.id)}/>)
        )}  
    </div>
    )
}

export const Phonebook = ({title, persons, filter,delfunction}) => {
    if(filter.length === 0)
    {
      return(
        <div>
          <h2>{title}</h2>
          {persons.map(person => <Person key={person.id} person={person} handleDelete={() =>delfunction(person.id)}/>)}    
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