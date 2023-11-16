import { Button, StyleSheet, Text, View, SafeAreaView, Image, ScrollView, ImageBackground } from 'react-native';

export default function RegionCard(props) {

    const regionImages = {
        Africa: require('../assets/Africa.png'),
        Americas: require('../assets/Americas.png'),
        Asia: require('../assets/Asia.png'),
        Europe: require('../assets/Europe.png'),
        Oceania: require('../assets/Oceania.png'),
      };
     
    return (
        <View style={styles.container}>
                <ImageBackground style={styles.regionImage} source={regionImages[`${props.regionName}`]} imageStyle={{ opacity: 0.08}}>
                    <Text style={styles.regionText}>{props.regionName}</Text>
                </ImageBackground>
        </View>
    );
    

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffb3b3',
        margin: 10,
        width: 190,
        height: 180,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },

    regionImage: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    regionText:{
        fontSize: 40,
        fontWeight: 'bold',
        color: '#3c3c3c',
        fontWeight: '700',
        letterSpacing: 0.15,
    },

  })