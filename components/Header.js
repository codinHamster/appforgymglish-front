import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';


export default function Header({ title }) {
     
    return (
        <View style={styles.container}>       
            <View>
                <Text style={styles.title}>{title || 'The World-Trotter'}</Text>
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
        fontSize: 30,
        color: '#3c3c3c',
        fontWeight: '800',
        textAlign: 'center',
        paddingHorizontal: 20,
    },

  })