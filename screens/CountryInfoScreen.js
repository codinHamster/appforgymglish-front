import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { useEffect, useState } from 'react';

import Header from '../components/Header';


export default function CountryInfoScreen({ route }) {

  const [countriesData, setCountriesData] = useState([]);

  const { selectCountry } = route.params;

  const BACKEND_ADDRESS = 'http://192.168.1.83:3000';

  useEffect(() => {
    if (selectCountry) {
      fetch(`${BACKEND_ADDRESS}/name/${selectCountry}`)
        .then(response => response.json())  
        .then(data => {
          const country = data.countryInfo[0]
          const currencyCode = Object.keys(country.currencies)[0];
          const currency = country.currencies[currencyCode].name;
          const formatedData = {
            name: country.translations.fra.common,
            capital: country.capital,
            flags: country.flags.png,
            population: country.population,
            area: country.area,
            currencyCode: currencyCode,
            currency: currency,
            carside: country.car.side };
          setCountriesData(formatedData);
        }); 
    }

          
  }, [selectCountry]);



 return (
  <SafeAreaView style={styles.container}>
    
    <View style={{flexDirection: 'row', justifyContent: 'center', marginHorizontal: 7 }}>
      <Header/>
    </View>

        <View>
          <Text>Nom du pays : {countriesData.name}</Text>
          <Text>Capital : {countriesData.capital} </Text>
          <Text>Superficie  : {countriesData.area} m2</Text>
          <Text>Population : {countriesData.population} habitants</Text>
          <Text>Devise  : {countriesData.currency} ({countriesData.currencyCode}) </Text>
          <Text>Sens de circulation : {countriesData.carside} </Text>
        </View>
    
  </SafeAreaView>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
})