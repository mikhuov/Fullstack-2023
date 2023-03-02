const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map(person => (
        <h4 key={ person.id }>{ person.name } { person.number } <button onClick={() => deletePerson(person.id)}>Delete</button></h4>
      ))}
    </div>
  );
};

export default Persons;