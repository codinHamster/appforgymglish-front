import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';

import { useEffect, useState } from 'react';

import Header from '../components/Header';
import CountryCard from '../components/CountryCard';
import RegionCard from '../components/RegionCard';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen({ navigation }) {

  const [countriesData, setCountriesData] = useState([]);
  const [selectRegion, setSelectRegion] = useState(null);
  const [searchCountry, setSearchCountry] = useState('');


  const BACKEND_ADDRESS = 'http://192.168.1.83:3000';

  useEffect(() => {
    if (selectRegion) {
      fetch(`${BACKEND_ADDRESS}/region/${selectRegion}`)
        .then(response => response.json())  
        .then(data => {
          const formatedData = data.countries.map(country => {
              
            return {
              name: country.name.common,
              nameFRA : country.translations.fra.common,
              flags: country.flags.png };
          });
          setCountriesData(formatedData);
        }); 
    } 
  }, [selectRegion]);

  useEffect(() => {
    const homeInitial = navigation.addListener('focus', () => {
      setSelectRegion(null);
    });
    return homeInitial;
  }, [navigation]);

  const handleSearch = () => {
    fetch(`https://restcountries.com/v3.1/translation/${searchCountry}`)
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(country => {
          return {
            name: country.name.common,
            nameFRA: country.translations.fra.common,
            flags: country.flags.png
          };
        });
        setCountriesData(formattedData);
        if (formattedData.length > 0) {
          navigation.navigate('countryInfo', { selectCountry: formattedData[0].name });
      };
  });
};

  const regions = [
    { name: 'Africa' },
    { name: 'Americas' },
    { name: 'Asia' },
    { name: 'Europe' },
    { name: 'Oceania' },
  ];

  const regionFr = {
    Africa : 'Afrique',
    Americas : 'Amériques',
    Asia : 'Asie',
    Oceania : 'Océanie'
  }

  const frenchRegionName = regionFr[selectRegion] || selectRegion

  const handleRegionClick = regionName => {
    setSelectRegion(regionName);
  };

  const handleCountryClick = selectCountry => {
    navigation.navigate('countryInfo', { selectCountry })
  }

 return (
  <SafeAreaView style={styles.container}>
   
   <View style={{flexDirection: 'column', justifyContent: 'center', marginHorizontal: 7 }}>
     <Header/>
   </View>

   {selectRegion && (
    <View>
      <Text style={styles.regionSelected}>Et quel pays en {frenchRegionName} ?</Text>
    </View>
   )}

  {!selectRegion && (
    <View>
      <Text style={styles.regionSelected}>Choisis la région ou recherche le pays</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setSearchCountry(text)}
        value={searchCountry}
        onSubmitEditing={handleSearch}
      />
      
    </View>
    )}
   
   
   <ScrollView>
    
    <View style={styles.regionContainer}>
      {!selectRegion &&
      regions.map((regions, i) => (
        <TouchableOpacity key={i} onPress={() => handleRegionClick(regions.name)}>
          <View key={i}>
            <RegionCard
              regionName={regions.name}
            />
          </View>
        </TouchableOpacity>
      )
      )}
    </View>

    {selectRegion && (
    <View style={styles.countryContainer}>
      {countriesData.map((data, i) => (
        <TouchableOpacity key={i} onPress={() => handleCountryClick(data.name)}>
          <View key={i}>
            <CountryCard
              name={data.nameFRA}
              flags={data.flags}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
    )}

   </ScrollView>
   
  </SafeAreaView>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbeeff',
  },

  textInput: {
    borderRadius: 30,
    height: 45,
    backgroundColor: 'white',
    marginHorizontal: 15,
    paddingHorizontal: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 7,
    marginBottom: 10
  },

  regionSelected: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3c3c3c',
    fontWeight: '700',
    letterSpacing: 0.15,
    marginLeft: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },

  regionContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },

  countryContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }

})