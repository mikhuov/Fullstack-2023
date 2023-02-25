const PersonForm = ({ addPerson, newPerson, handleAddition }) => {
  return (
    <form onSubmit={ addPerson }>
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                Name: <input name="name" type="text" value={ newPerson.name } onChange={ handleAddition }/>
              </td>
            </tr>
            <tr>
              <td>
                Number: <input name="number" type="text" value={ newPerson.number } onChange={ handleAddition }/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PersonForm;