import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import countriesService from './services/countriesService';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    countriesService.getAllCountries().then((response) => {
      console.log('RESPONSE: ', response.data);
      setCountries(response.data);
    });
  }, []);

  const filterCountries = event => {
    const value = event.target.value
    setFilter(value);
    setFilteredCountries(countries.filter(country => 
      country.name.common.toLowerCase().includes(value.toLowerCase())
      ));
  };

  return (
    <div>
      Find countries <input type="text" value={ filter } onChange={ filterCountries }></input>
      <Countries countries={ filteredCountries } setCountries={ setFilteredCountries }/>
    </div>
  );
};

export default App;