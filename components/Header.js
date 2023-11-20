import { Platform, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function Header({ title, showArrow, onBackClick, showClose, onCloseClick, showDelete, onDeleteClick }) {

    return (
        <View style={styles.container}>   
             

            <View>
                <Text style={styles.title}>{title || 'The World Trotter'}</Text>
            </View>
            
            {showArrow && (
                <TouchableOpacity onPress={onBackClick}>
                    <FontAwesome name={'arrow-left'} size={24} color={'#3c3c3c'}/>
                </TouchableOpacity>
            )}

            {showClose && (
                <TouchableOpacity onPress={onCloseClick}>
                    <FontAwesome name={'close'} size={28} color={'#3c3c3c'}/>
                </TouchableOpacity>
            )}

            {showDelete && (
                <TouchableOpacity onPress={onDeleteClick}>
                    <FontAwesome name={'trash-o'} size={28} color={'#3c3c3c'}/>
                </TouchableOpacity>
            )}


        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 60,
        // backgroundColor: '#8bc9ff',
        borderBottomWidth: 2,
        borderColor: '#8bc9ff',
        borderRadius: 15,
        marginBottom: 20,
        paddingHorizontal: 20, 
    },

    title:{
        fontSize: 28,
        color: '#3c3c3c',
        fontWeight: '700',
        textAlign: 'center',
        
    },

  })