import { Text, View, FlatList, Button, StyleSheet } from "react-native"
import { useSelector } from 'react-redux'

const QuestionScreen = ({ navigation }) => {
  

  return (
    <View style={styles.container}>
     
      <View style={styles.footer}>
        <Button title="Add Question" onPress={() => navigation.navigate('AddQuestion')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  text: {
    fontSize: 16
  },
  footer: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0, 
    padding: 12, 
    backgroundColor: '#fff', 
    borderTopWidth: 1, 
    borderTopColor: '#eee'
  }
})


export default QuestionScreen;