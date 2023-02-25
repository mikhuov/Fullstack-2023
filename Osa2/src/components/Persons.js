const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person => (
        <h4 key={ person.id }>{ person.name } { person.number }</h4>
      ))}
    </div>
  );
};

export default Persons;