import { Text, View, FlatList, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { setSubject, deleteQuestion, fetchBySubject } from '../redux/QuestionSlice';
import store from '../redux/Store';
import { useEffect } from 'react';

const QuestionScreen = ({ navigation, route }) => {
  const { bySubject, current } = useSelector(state => state.questions);
  const { categoryId } = route.params || {};
  
  const subjectNames = {
    '1': 'React Native',
    '2': 'Flutter', 
    '3': 'Python',
    '4': 'Node',
    '5': 'JavaScript'
  };

  useEffect(() => {
    if (categoryId) {
      store.dispatch(fetchBySubject(categoryId));
    }
  }, [categoryId]);

  const currentQuestions = current ? bySubject[current] || [] : [];

  const handleDeleteQuestion = (questionId) => {
    store.dispatch(deleteQuestion({ subjectId: current, questionId }));
  };

  const renderQuestion = ({ item }) => (
    <TouchableOpacity 
      style={styles.questionItem}
      onPress={() => navigation.navigate('QuestionDetails', { subjectId: current, questionId: item.id })}
    >
      <View style={styles.questionContent}>
        <Text style={styles.questionText}>{item.text}</Text>
        {item.answers && item.answers.length > 0 && (
          <Text style={styles.answerCount}>
            {item.answers.length} answer{item.answers.length !== 1 ? 's' : ''}
          </Text>
        )}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={(e) => {
            e.stopPropagation()
            navigation.navigate('AddQuestion', { subjectId: current, questionId: item.id, initialText: item.text })
          }}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={(e) => {
            e.stopPropagation()
            handleDeleteQuestion(item.id)
          }}
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {current ? subjectNames[current] : 'Questions'}
        </Text>
        <Button
          title="Add Question"
          onPress={() => navigation.navigate('AddQuestion', { subjectId: current })}
        />
      </View>
      
      {currentQuestions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No questions yet. Add your first question!</Text>
        </View>
      ) : (
        <FlatList
          data={currentQuestions}
          keyExtractor={item => item.id}
          renderItem={renderQuestion}
          style={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  list: {
    flex: 1,
  },
  questionItem: {
    backgroundColor: '#fff',
    margin: 8,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  questionContent: {
    flex: 1,
    marginRight: 12,
  },
  questionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  answerCount: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#ffaa00',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});

export default QuestionScreen;












// import { Text, View, FlatList, Button, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
// import { useSelector } from 'react-redux';
// import { fetchMovies } from '../redux/MovieSlice';
// import { useEffect } from 'react';
// import store from '../redux/Store';

// const QuestionScreen = ({ navigation }) => {
//   const { movies, loading, error } = useSelector(state => state.movies);
//   // const counter =useSelector(state => state.counter.value);

//   useEffect(() => {
//     store.dispatch(fetchMovies());
//   }, []);

//   if (loading) return <ActivityIndicator size="large" color="blue" />;
//   if (error) return <Text style={styles.error}>{error}</Text>;

//   return (
//     // <View style={styles.container}>
//     //   <Text style={styles.counterText}>Count: {counter}</Text>

//     //   <View style={styles.buttonContainer}>
//     //     <Button title="Increment" onPress={() => dispatch(increment())} />
//     //     <Button title="Decrement" onPress={() => dispatch(decrement())} />
//     //   </View>
//     //   <View style={styles.footer}>
//     //     <Button
//     //       title="Add Question"
//     //       onPress={() => navigation.navigate('AddQuestion')}
//     //     />
//     //   </View>
//     // </View>
    
      
//       <FlatList
//         data={movies}
//         keyExtractor={item => item.imdbID}
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <Text style={styles.title}>{item.Title}</Text>
//           </View>
//         )}
//       />
   
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 12,
//   },
//   item: {
//     padding: 12,
//     borderBottomColor: '#ccc',
//     borderBottomWidth: 1,
//   },
//   title: {
//     fontSize: 18,
//   },
//   error: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//   },

//   // container: {
//   //   flex: 1,
//   //   justifyContent: 'center',
//   //   alignItems: 'center',
//   // },
//   // counterText: {
//   //   fontSize: 32,
//   //   marginBottom: 20,
//   // },
//   // buttonContainer: {
//   //   flexDirection: 'row',
//   //   gap: 20,
//   // },

//   // item: {
//   //   padding: 12,
//   //   borderBottomWidth: 1,
//   //   borderBottomColor: '#eee',
//   // },
//   // text: {
//   //   fontSize: 16,
//   // },
//   // footer: {
//   //   position: 'absolute',
//   //   left: 0,
//   //   right: 0,
//   //   bottom: 0,
//   //   padding: 12,
//   //   backgroundColor: '#fff',
//   //   borderTopWidth: 1,
//   //   borderTopColor: '#eee',
//   // },
// });

// export default QuestionScreen;
