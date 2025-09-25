import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Provider } from 'react-redux'
import store from './src/redux/Store'
import Dashboard  from './src/screens/Dashboard'
import QuestionScreen from './src/screens/QuestionScreen'
import AddQuestionScreen from './src/screens/AddQuestionScreen'



const Stack =  createNativeStackNavigator();

const App =()=>{

  return(
   <>
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Dashboard' component={Dashboard}/>
          <Stack.Screen name="QuestionScreen" component={QuestionScreen}/>
          <Stack.Screen name="AddQuestion" component={AddQuestionScreen} options={{ title: 'Add Question' }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
   </>
  )
}

export default App;



// import { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

// const App = () => {
//   const [name, setName] = useState('');
//   const [greeting, setGreeting] = useState('');

//   const handlePress = () => {
//     setGreeting(`Hello ${name}, Welcome to the react native`);
//     setName('');
//   };
//   return (
//     <View style={styles.coontainer}>
//       <Text style={styles.heading}>Welcome!</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Enter your name"
//         value={name}
//         onChangeText={text => setName(text)}
        
//       />

//       <Button title="Greet me" onPress={handlePress} />

//       {greeting !== '' && (
//         <Text style={styles.greeting}>{greeting}</Text>
//       )}
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   coontainer: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#aaa',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   greeting: {
//     marginTop: 20,
//     fontSize: 18,
//     color: 'green',
//     textAlign: 'center',
//   },
// });




