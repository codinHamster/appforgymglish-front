import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector} from 'react-redux';

import Header from '../components/Header';

import { removeCountry } from '../reducers/favorites';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.value)

  const handleDelete = (countryToRemove) => {
    dispatch(removeCountry(countryToRemove.name))
  }

  const handleCountryClick = selectCountry => {
    navigation.navigate('countryInfo', { selectCountry: selectCountry.cca3 })
  }

 return (
  <SafeAreaView style={styles.container}>

    <View style={{flexDirection: 'row', justifyContent: 'center', marginHorizontal: 7 }}>
      <Header title="Mes pays à visiter"/>
    </View>

    <ScrollView>
   
    <View style={styles.favContainer}>
      {/* <Text>Favoris</Text> */}
      {favorites.map((country, i) => (
          <View key={i} style={styles.cardCountry}>

            <TouchableOpacity onPress={() => handleCountryClick(country)}>
              <Image style={styles.flag}  source={{ uri : `${country.flags}`}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleCountryClick(country)}>
              <Text>{country.name}</Text>   
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => handleDelete(country)}>
              <FontAwesome style={styles.deleteIcon} name="trash" color="#ff8787"/>
            </TouchableOpacity>

          </View>
      ))}
    </View>

    </ScrollView>

  </SafeAreaView>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbeeff',
  },

  favContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },

  flag:{
    height: 40,
    width: 70,
    resizeMode: 'stretch',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000000'
  },

  cardCountry: {
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
    marginTop: 10,
    height: 80,
    width: '95%',
    paddingHorizontal: 20
  },

  deleteIcon: {
    fontSize: 20
  }
})