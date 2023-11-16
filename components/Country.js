import { Button, StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';

export default function Country(props) {
     
    return (
        <View>
            <View>
                <Image source={{ uri : `${props.flags}`}} style={styles.flag}/>
            </View>
                    
            <View>
                <Text style={styles.name}>{props.name}</Text>
            </View>
            
        </View>
    );
    

}

const styles = StyleSheet.create({

    flag:{
        borderWidth: 2,
        borderColor: '#474747',
        borderRadius: 15,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
        height: 70,
        width: 140,
        resizeMode: 'stretch',
      },

  })