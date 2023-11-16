import { Button, StyleSheet, Text, View, SafeAreaView, Image, ScrollView, ImageBackground } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';


export default function Country(props) {

     
    return (
        // <View>
        //     <View>
        //         <Image source={{ uri : `${props.flags}`}} style={styles.flag}/>
        //     </View>
                    
        //     <View>
        //         <Text style={styles.name}>{props.name}</Text>
        //     </View>
            
        // </View>

        <View>
            <View style={styles.cardFlag}>
                <Image style={styles.flag} source={{ uri : `${props.flags}`}}/>
                <Text style={styles.name}>{props.name}</Text>
            </View>     
        </View>
    );
}

const styles = StyleSheet.create({

    cardFlag: {
        height: 175,
        width: 175,
        borderRadius: 15,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        backgroundColor: '#ffffff',
        margin: 15,
    },

    flag:{
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 30,
        overflow: 'hidden',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 3,
        shadowRadius: 4,
        height: 50,
        width: 80,
        resizeMode: 'stretch',
      },

    name: {
        fontSize: 22,
        fontWeight: '700',
        color: '#3c3c3c',
        textAlign: 'center'
    }

  })