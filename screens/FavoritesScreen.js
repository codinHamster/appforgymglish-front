
import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function ProfileScreen({ navigation }) {
 return (
  <SafeAreaView style={styles.container}>
   <View>
     <Text>Favoris</Text>
   </View>
  </SafeAreaView>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
})