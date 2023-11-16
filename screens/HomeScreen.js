import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

import { useEffect, useState } from 'react';

import Header from '../components/Header';
import CountryCard from '../components/CountryCard';
import RegionCard from '../components/RegionCard';

import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function HomeScreen({ navigation }) {

  const [countriesData, setCountriesData] = useState([]);
  const [selectRegion, setSelectRegion] = useState(null);


  const BACKEND_ADDRESS = 'http://192.168.1.83:3000';

  useEffect(() => {
    if (selectRegion) {
      fetch(`${BACKEND_ADDRESS}/region/${selectRegion}`)
        .then(response => response.json())  
        .then(data => {
          const formatedData = data.countries.map(country => {
              
            return { name: country.translations.fra.common, flags: country.flags.png };
          });
          setCountriesData(formatedData);
        }); 
    }

          
  }, [selectRegion]);

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

  const handleRegionClick = (regionName) => {
    setSelectRegion(regionName);
  };

 return (
  <SafeAreaView style={styles.container}>
   
   <View style={{flexDirection: 'row', justifyContent: 'center', marginHorizontal: 7 }}>
     <Header/>
   </View>

   {selectRegion && (
   <View>
      <Text style={styles.regionSelected}>Et quelle pays en {frenchRegionName} ?</Text>
   </View>
   )}

  {!selectRegion && (
    <View>
        <Text style={styles.regionSelected}>Dans quelle partie du monde veux-tu bouger ?</Text>
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
          <View key={i}>
            <CountryCard
              name={data.name}
              flags={data.flags}
            />
          </View>
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