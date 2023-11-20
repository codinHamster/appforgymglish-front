import { StyleSheet, Text, View, ImageBackground } from 'react-native';


export default function RegionCard(props) {

    const regionImages = {
        Africa: require('../assets/Africa.png'),
        Americas: require('../assets/Americas.png'),
        Asia: require('../assets/Asia.png'),
        Europe: require('../assets/Europe.png'),
        Oceania: require('../assets/Oceania.png'),
    };

    const regionFr = {
        Africa : 'Afrique',
        Americas : 'Amériques',
        Asia : 'Asie',
        Oceania : 'Océanie'
    };

    const frenchRegionName = regionFr[props.regionName] || props.regionName;
     
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.regionImage} source={regionImages[`${props.regionName}`]} blurRadius={2} imageStyle={{ opacity: 0.2}}>
                <Text style={styles.regionText}>{frenchRegionName}</Text>
            </ImageBackground>
        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bce1ff',
        margin: 10,
        width: 150,
        height: 150,
        borderRadius: 75,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 7,
    },

    regionImage: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    regionText:{
        fontSize: 26,
        color: '#3c3c3c',
        fontWeight: '700',
    },

  })