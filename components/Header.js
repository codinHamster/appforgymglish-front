import { Platform, StatusBar, Button, StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import Constants from 'expo-constants';

export default function Header(props) {
     
    return (
        <View style={styles.container}>       
            <View>
                <Text style={styles.title}>The World-Trotter</Text>
            </View>
        </View>
    );
    

}

const styles = StyleSheet.create({

    container: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 80,
        backgroundColor: '#8bc9ff',
        borderRadius: 15,       
    },

    title:{
        fontFamily: 'System',
        fontSize: 30,
        color: '#3c3c3c',
        fontWeight: '900',
    },

  })