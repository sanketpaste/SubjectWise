import { Text, View, FlatList, Button, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { setSubjectRequest, deleteQuestionRequest } from '../redux/QuestionSlice';
import { useEffect } from 'react';
import store from '../redux/Store';

const QuestionScreen = ({ navigation, route }) => {
  const { bySubject, current, loading, error } = useSelector(state => state.questions);
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
      store.dispatch(setSubjectRequest(categoryId));
    }
  }, [categoryId]);

  const currentQuestions = current ? bySubject[current] || [] : [];

  const handleDeleteQuestion = (questionId) => {
    store.dispatch(deleteQuestionRequest({ subjectId: current, questionId }));
  };

  const renderQuestion = ({ item }) => (
    <View style={styles.questionItem}>
      <Text style={styles.questionText}>{item.text}</Text>
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate('AddQuestion', { subjectId: current, questionId: item.id, initialText: item.text })}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDeleteQuestion(item.id)}
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color="blue" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

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
  questionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginRight: 12,
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
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default QuestionScreen;
