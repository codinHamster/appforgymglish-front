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
        height: 60,
        // backgroundColor: '#8bc9ff',
        borderBottomWidth: 3,
        borderColor: '#8bc9ff',
        // borderRadius: 15,
        marginBottom: 20   
    },

    title:{
        fontSize: 28,
        color: '#3c3c3c',
        fontWeight: '700',
        textAlign: 'center',
        paddingHorizontal: 20,
    },

  })