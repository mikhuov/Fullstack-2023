const Filter = ({ filter, filterPhonebook }) => {
  return (
    <div>
      <input name="filter" value={ filter } onChange={ filterPhonebook }/>
    </div>
  );
};

export default Filter;