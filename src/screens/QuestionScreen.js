import { Text, View, FlatList, Button, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchMovies } from '../redux/MovieSlice';
import { useEffect } from 'react';
import store from '../redux/Store';

const QuestionScreen = ({ navigation }) => {
  const { movies, loading, error } = useSelector(state => state.movies);
  // const counter =useSelector(state => state.counter.value);

  useEffect(() => {
    store.dispatch(fetchMovies());
  }, []);

  if (loading) return <ActivityIndicator size="large" color="blue" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    // <View style={styles.container}>
    //   <Text style={styles.counterText}>Count: {counter}</Text>

    //   <View style={styles.buttonContainer}>
    //     <Button title="Increment" onPress={() => dispatch(increment())} />
    //     <Button title="Decrement" onPress={() => dispatch(decrement())} />
    //   </View>
    //   <View style={styles.footer}>
    //     <Button
    //       title="Add Question"
    //       onPress={() => navigation.navigate('AddQuestion')}
    //     />
    //   </View>
    // </View>
    
      
      <FlatList
        data={movies}
        keyExtractor={item => item.imdbID}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.Title}</Text>
          </View>
        )}
      />
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  item: {
    padding: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },

  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // counterText: {
  //   fontSize: 32,
  //   marginBottom: 20,
  // },
  // buttonContainer: {
  //   flexDirection: 'row',
  //   gap: 20,
  // },

  // item: {
  //   padding: 12,
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#eee',
  // },
  // text: {
  //   fontSize: 16,
  // },
  // footer: {
  //   position: 'absolute',
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   padding: 12,
  //   backgroundColor: '#fff',
  //   borderTopWidth: 1,
  //   borderTopColor: '#eee',
  // },
});

export default QuestionScreen;
