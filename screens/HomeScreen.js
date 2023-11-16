import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

import { useEffect, useState } from 'react';

import Header from '../components/Header';
import Country from '../components/Country';
import RegionCard from '../components/RegionCard';

export default function HomeScreen({ navigation }) {

  const [countriesData, setCountriesData] = useState([]);
  const [selectRegion, setSelectRegion] = useState(null);


  const BACKEND_ADDRESS = 'http://192.168.1.83:3000';

  // useEffect(() => {
  //   fetch(`${BACKEND_ADDRESS}/country`)
  //     .then(response => response.json())  
  //     .then(data => {
  //       const formatedData = data.countries.map(country => {
            
  //         return { name: country.translations.fra.common, flags: country.flags.png };
  //       });
  //       setCountriesData(formatedData);
  //     });
          
  // }, []);

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

  const handleRegionClick = (regionName) => {
    setSelectRegion(regionName);
  };

 return (
  <SafeAreaView style={styles.container}>
   
   <View>
     <Header />
   </View>
   
   <ScrollView>
    <View>
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
    <View>
      <Text style={styles.regionSelected}>{selectRegion}</Text>
      {countriesData.map((data, i) => (
          <View key={i}>
            <Country
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
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },

  regionSelected: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#3c3c3c',
    fontWeight: '700',
    letterSpacing: 0.15,
  },
})