import { Button, StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';

export default function Header(props) {
     
    return (
        <View style={styles.container}>
                    
            <View>
                <Text style={styles.title}>The World Trotter</Text>
            </View>
            
        </View>
    );
    

}

const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 80,
        backgroundColor: '#2191f3',
    },

    title:{
        fontSize: 30,
        color: '#3c3c3c',
        fontWeight: '900',
    },

  })