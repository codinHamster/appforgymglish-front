import { Button, StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';

export default function Header(props) {
     
    return (
        <View>
                    
            <View>
                <Text style={styles.title}>The World Trotter</Text>
            </View>
            
        </View>
    );
    

}

const styles = StyleSheet.create({

    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3c3c3c',
        fontWeight: '900',
        height: 100,
      },

  })