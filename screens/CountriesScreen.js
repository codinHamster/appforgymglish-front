import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { useEffect, useState } from 'react';

import Country from '../components/Country';

export default function HomeScreen({ navigation }) {

  const [countriesData, setCountriesData] = useState([]);


  const BACKEND_ADDRESS = 'http://192.168.1.83:3000';

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/country`)
      .then(response => response.json())  
      .then(data => {
        const formatedData = data.countries.map(country => {
            
          return { name: country.name.common, flags: country.flags.png };
        });
        setCountriesData(formatedData);
      });
          
  }, []);



 return (
  <SafeAreaView style={styles.container}>
   
   <View>
     <Text>Accueil</Text>
   </View>
   
   {/* <View>
   {moviesData.map((data, i) => (
      <View key={i}>
        <Movie
          title={data.title}
          overview={data.overview}
          poster={data.poster}
          voteAverage={data.voteAverage}
          voteCount={data.voteCount}
          releaseDate={data.releaseDate}
          onImageClick={() => setSelectedFilmIndex(i)}
          idMovie={data.idMovie}
        />
      </View>
   ))}
   </View> */}

   <View>
   {countriesData.map((data, i) => (
      <View key={i}>
        <Country
          name={data.name}
          flags={data.flags}
        />
      </View>
   ))}
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