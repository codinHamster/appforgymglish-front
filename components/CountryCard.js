import { StyleSheet, Text, View, Image } from 'react-native';


export default function CountryCard(props) {

    return (
        
        <View>
            <View style={styles.cardCountry}>
                <Image style={styles.flag} source={{ uri : `${props.flags}`}}/>
                <Text style={styles.name}>{props.name}</Text>
            </View>     
        </View>
    );
}


const styles = StyleSheet.create({

    cardCountry: {
        height: 150,
        width: 150,
        borderRadius: 15,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 7,
        backgroundColor: '#fdfdfd',
        margin: 10,
        paddingHorizontal: 10
    },

    flag:{
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 30,
        overflow: 'hidden',
        height: 40,
        width: 70,
        resizeMode: 'stretch',
        marginBottom: 15
      },

    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#3c3c3c',
        textAlign: 'center'
    }

  })