import axios from 'axios'
import {useEffect, useState} from "react";

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) return;
    axios.get(`https://restcountries.com/v3.1/name/${name}`)
      .then(({ data }) => {
        if (data.length === 1) {
          const { name: { common }, capital, population, flags: { png: flag } } = data[0];
          setCountry({ data: { name: common, capital: capital[0], population, flag }, found: true });
        } else {
          setCountry({ found: false });
        }
      })
      .catch(() => setCountry({ found: false }));
  }, [name]);
  return country
}