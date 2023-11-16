import { Button, StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';

export default function RegionCard(props) {
     
    return (
        <View>
                   
            <View>
                <Text style={styles.regionText}>{props.regionName}</Text>
            </View>
            
        </View>
    );
    

}

const styles = StyleSheet.create({

    regionText:{
        fontSize: 40,
        fontWeight: 'bold',
        color: '#3c3c3c',
        fontWeight: '400',
        letterSpacing: 0.15,
      },

  })