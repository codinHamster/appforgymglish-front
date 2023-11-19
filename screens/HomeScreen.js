import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';

import { useEffect, useState } from 'react';

import Header from '../components/Header';
import CountryCard from '../components/CountryCard';
import RegionCard from '../components/RegionCard';

import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function HomeScreen({ navigation }) {

  const [countriesData, setCountriesData] = useState([]);
  const [selectRegion, setSelectRegion] = useState(null);
  const [searchCountry, setSearchCountry] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showRegionCard, setShowRegionCard] = useState(true);

  const BACKEND_ADDRESS = 'https://appforgymglish-back.vercel.app';

  useEffect(() => {
    if (selectRegion) {
      fetch(`${BACKEND_ADDRESS}/region/${selectRegion}`)
        .then(response => response.json())  
        .then(data => {
          const formatedData = data.countries.map(country => {
              
            return {
              name: country.name.common,
              nameFRA : country.translations.fra.common,
              flags: country.flags.png,
              cca3: country.cca3 };  
          });
          setCountriesData(formatedData);
        }); 
    } 
  }, [selectRegion]);

  useEffect(() => {
    const homeInitial = navigation.addListener('focus', () => {
      setSelectRegion(null);
      setSearchCountry('');
    });
    return homeInitial;
  }, [navigation]);

  const handleSearch = () => {
    if (searchCountry.length > 1) {
      setShowRegionCard(false);
      fetch(`https://restcountries.com/v3.1/translation/${searchCountry}?fulltext=true`)
        .then(response => response.json())
        .then(data => {
          const formattedData = data.map(country => {
            return {
              // name: country.name.common,
              nameFRA: country.translations.fra.common,
              // flags: country.flags.png,
              cca3: country.cca3
            };
          });
          setSearchResults(formattedData);
      });
    } else {
      setShowRegionCard(true)
      setSearchResults([]);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchCountry]);
  
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
        <Header title={frenchRegionName}/>
      </View>

      {selectRegion && (
        <View>
          <Text style={styles.regionSelected}>Quel pays en {frenchRegionName} veux-tu voir ?</Text>
        </View>
      )}

      {!selectRegion && (
        <View>
          <Text style={styles.regionSelected}>Recherche un pays ou choisis une région</Text>
          
          <TextInput
            style={styles.textInput}
            onChangeText={text => setSearchCountry(text)}
            value={searchCountry}
            onSubmitEditing={handleSearch}
            placeholder='Rechercher directement le pays'
          />
        </View>
      )}
      
      <ScrollView>
        {searchResults.map((result, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('countryInfo', { selectCountry: result.cca3 })}>
            <Text style={styles.textResult}>{result.nameFRA}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView>

        {showRegionCard && (
        <View style={styles.regionContainer}>
          {!selectRegion &&
          regions.map((regions, i) => (
            <TouchableOpacity key={i} onPress={() => handleRegionClick(regions.name)} activeOpacity={0.8}>
              <RegionCard
                regionName={regions.name}
              />
            </TouchableOpacity>
          )
          )}
        </View>
        )}

        {selectRegion && (
        <View style={styles.countryContainer}>
          {countriesData.map((data, i) => (
            <TouchableOpacity key={i} onPress={() => handleCountryClick(data.cca3)}>
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
    marginTop: 5,
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
    marginBottom: 15,
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
  },

  textResult: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
  }

})