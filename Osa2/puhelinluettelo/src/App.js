import { useEffect, useState } from 'react'
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import personsService from './services/personsService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name:"",
    number:""
  });
  const [filter, setFilter] = useState("");
  const [filterState, setFilterState] = useState([]);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personsService.getAllPersons().then(result => {
      setPersons(result.data);
      setFilterState(result.data);
    });
  }, []);

  const addPerson = event => {
    event.preventDefault();
    const personExists = persons.filter(person => person.name === newPerson.name);

    if (personExists !== 0) {
      personsService.updatePerson(personExists[0].id, newPerson).then(() => {
        setMessage(`Updated ${ newPerson.name }'s number`)
      }).catch(() => {
        setErrorMessage(`Information of ${ newPerson.name } has already been removed from server`)
      });
    } else {
      personsService.createNewPerson(newPerson).then(result => {
        setPersons(persons.concat(result));
        setFilterState(persons.concat(result));
        setMessage(`Added ${ newPerson.name } to phonebook`);
      });
    }
  };

  const handleAddition = event => {
    const value = event.target.value;
    setNewPerson({ ...newPerson, [event.target.name]: value });
  };

  const filterPhonebook = event => {
    const filter = event.target.value;
    setFilter(filter);
    setFilterState(persons.filter(person => person.name.toLowerCase().includes(filter)));
  };

  const deletePerson = id => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      personsService.deletePerson(id).then(() => {
        alert("Person deleted");
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={ message } errorMessage={ errorMessage }/>
      <p>Filter shown with</p>
      <Filter filter={ filter } filterPhonebook={ filterPhonebook }/>
      <h4>Add new</h4>
      <PersonForm addPerson={ addPerson } newPerson={ newPerson } handleAddition={ handleAddition }/>
      <h2>Numbers</h2>
      <Persons persons={ filterState } deletePerson={ deletePerson }/>
    </div>
  )
};

export default App;