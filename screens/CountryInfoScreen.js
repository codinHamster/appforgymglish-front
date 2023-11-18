import { Button, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

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
            population: country.population.toLocaleString('fr-FR'),
            area: country.area.toLocaleString('fr-FR'),
            currencyCode: currencyCode,
            currency: currency,
            carside: country.car.side };
          setCountriesData(formatedData);
        }); 
    }

          
  }, [selectCountry]);

  const carsideFr = {
    'right': 'À droite',
    'left': 'À gauche'
  };
  
  const frenchCarside = carsideFr[countriesData.carside] || countriesData.carside;

 return (
  <SafeAreaView style={styles.container}>
  {/* <KeyboardAvoidingView style={{flex:1, marginHorizontal:20,}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
    
    <View style={{flexDirection: 'row', justifyContent: 'center', marginHorizontal: 7 }}>
      <Header/>
    </View>

    <View style={styles.cardCountry}>
      <View>
        <Image style={styles.flag}  source={{ uri : `${countriesData.flags}`}}/>
      </View>
      
      
      <Text style={styles.countryText}>{countriesData.name}</Text>
      
      <View>
        <Text style={styles.titleText}>Capitale</Text>
        <Text style={styles.text}>{countriesData.capital} </Text>
      </View>

      <View>
        <Text style={styles.titleText}>Superficie</Text>
        <Text style={styles.text}>{countriesData.area} km2</Text>
      </View>
      
      <View>
        <Text style={styles.titleText}>Population</Text>
        <Text style={styles.text}>{countriesData.population} habitants</Text>
      </View>  

      <View>
        <Text style={styles.titleText}>Devise</Text>
        <Text style={styles.text}>{countriesData.currency}</Text>
        <Text style={styles.text}>({countriesData.currencyCode}) </Text>
      </View>  

      <View>
        <Text style={styles.titleText}>Sens de circulation</Text>
        <Text style={styles.text}>{frenchCarside} </Text>
      </View>
    </View>

    <TouchableOpacity style={styles.buttons} activeOpacity={0.5}>
      <Text style={styles.btnText}>Ajouter dans ma liste</Text>
    </TouchableOpacity>
  
  {/* </KeyboardAvoidingView> */}
  </SafeAreaView>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbeeff',
    alignItems: 'center',
  },

  flag:{
    height: 60,
    width: 90,
    resizeMode: 'stretch',
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 5
  },

  cardCountry: {
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#fdfdfd',
    marginTop: 15,
    height: 500,
    width: '90%',
    paddingBottom: 10
  },

  countryText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#3c3c3c',
    textAlign: 'center'
  },

  titleText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3c3c3c',
    textAlign: 'center',
  },

  text: {
    fontSize: 20,
    fontWeight: '400',
    color: '#3c3c3c',
    textAlign: 'center'
  },

  buttons: {
    width: '90%',
    height: 60,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 7
  },

  btnText: {
    color: '#3c3c3c',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },

})