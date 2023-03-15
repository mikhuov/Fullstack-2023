
import Weather from "./Weather";

const Countries = ({ countries, setCountries }) => {
  if(countries.length > 10) {
  return <div>
    Too many matches, specify another filter;
  </div>
}

if(countries.length === 1) {
  return countries.map(country => (
    <div key={ country.name.official }>

      <h2>{ country.name.common }</h2>
      <h4>{ country.capital[0] }</h4>
      <h4>{ country.area }</h4>

      Languages: 
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <div>
        <img src={ country.flags.png } alt="flag"></img>
        <Weather country={ country }/>
      </div>
    </div>
  ));
}
  return countries.map(country => (
    <div key={ country.name.official }>
      { country.name.common }
      <button onClick={() => setCountries([country])}>Show</button>
    </div>
  ));
};

export default Countries;