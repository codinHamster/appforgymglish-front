import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/Header';

import { addCountry, removeCountry } from '../reducers/favorites'

export default function CountryInfoScreen({ route }) {

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.value)

  const [countriesData, setCountriesData] = useState([]);

  const { selectCountry } = route.params;

  const BACKEND_ADDRESS = 'https://appforgymglish-back.vercel.app';

  useEffect(() => {
    if (selectCountry) {
      fetch(`${BACKEND_ADDRESS}/alpha/${selectCountry}`)
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
            carside: country.car.side,
            cca3: country.cca3 };
          setCountriesData(formatedData);
        }); 
    }     
  }, [selectCountry]);


  const carsideFr = {
    'right': 'À droite',
    'left': 'À gauche'
  };
  
  const frenchCarside = carsideFr[countriesData.carside] || countriesData.carside;

  const isFavorite = (country) => {
    return favorites.some(item => item.cca3 === country.cca3);
  };

  const buttonStyle = isFavorite(countriesData) ? styles.buttons : styles.favoriteButton;

  const handleSubmit = (newCountry) => {
    if (isFavorite(newCountry)) {
      dispatch(removeCountry(newCountry.name));
    } else {
    dispatch(addCountry(newCountry));
    }
  };

  return (
  <SafeAreaView style={styles.container}>
    
    <View style={{flexDirection: 'row', justifyContent: 'center', marginHorizontal: 7 }}>
      <Header title={countriesData.name}/>
    </View>

    <View style={styles.cardCountry}>
      <View>
        <Image style={styles.flag}  source={{ uri : `${countriesData.flags}`}}/>
      </View>
         
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

    <TouchableOpacity style={buttonStyle} activeOpacity={0.5} onPress={() => handleSubmit(countriesData)}>
      <Text style={styles.btnText}>{isFavorite(countriesData) ? 'Retirer de ma liste' : 'Ajouter à ma liste'}</Text>
    </TouchableOpacity>
  
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
    borderRadius: 5,
    borderColor: '#000000'
  },

  cardCountry: {
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
    // marginTop: 15,
    height: 500,
    width: '90%',
    paddingBottom: 10
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
    backgroundColor: '#ffcbcb',
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 7,
    borderWidth: 1,
    borderColor: '#ff8787'
  },

  favoriteButton: {
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
    elevation: 7,
  },

  btnText: {
    color: '#3c3c3c',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },

})