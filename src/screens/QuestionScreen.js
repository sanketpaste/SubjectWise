import { Text, View, FlatList, Button, StyleSheet } from "react-native"
import { useDispatch, useSelector } from 'react-redux'
import {increment, decrement} from '../redux/CounterSlice'

const QuestionScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const counter =useSelector(state => state.counter.value);


  return (
    <View style={styles.container}>
     <Text style={styles.counterText}>Count: {counter}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Increment" onPress={() => dispatch(increment())} />
        <Button title="Decrement" onPress={() => dispatch(decrement())} />
      </View>
      <View style={styles.footer}>
        <Button title="Add Question" onPress={() => navigation.navigate('AddQuestion')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    counterText: {
      fontSize: 32,
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 20,
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