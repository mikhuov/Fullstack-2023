import { useState } from 'react'
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: "Arto Hellas",
      id: 1,
      number: "040-1231244"
    }
  ]);
  const [newPerson, setNewPerson] = useState({
    name:"",
    number:""
  });

  const addPerson = event => {
    console.log("ADD PERSON", newPerson);
    
    event.preventDefault();
    const newPersonObj = {
      name: newPerson.name,
      id: persons.length + 1,
      number: newPerson.number
    };
    console.log(newPersonObj);

    persons.map(person => {
      if(person.name === newPerson.name) {
        alert(`${person.name} is already added to the phonebook`);
      } else {   
        setPersons(persons.concat(newPersonObj));
        console.log(persons);
        setNewPerson({ 
          name: "", 
          number: "" 
        });
      }
    })
  };

  const handleAddition = event => {
    console.log(event.target.value);
    const value = event.target.value;
    setNewPerson({ ...newPerson, [event.target.name]: value });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm addPerson={ addPerson } newPerson={ newPerson } handleAddition={ handleAddition }/>
      <h2>Numbers</h2>
      <Persons persons={ persons }/>
    </div>
  )

};

export default App;