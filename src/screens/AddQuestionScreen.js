import { Text, View, TextInput, Button, StyleSheet, SafeAreaView, Alert } from "react-native"
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { addQuestionRequest, updateQuestionRequest } from '../redux/QuestionSlice'
import store from '../redux/Store'

const AddQuestionScreen = ({ navigation, route }) => {
  const [questionText, setQuestionText] = useState('')
  const { subjectId, questionId, initialText } = route.params || {}

  useEffect(() => {
    if (initialText) {
      setQuestionText(initialText)
    }
  }, [initialText])
  
  const subjectNames = {
    '1': 'React Native',
    '2': 'Flutter', 
    '3': 'Python',
    '4': 'Node',
    '5': 'JavaScript'
  }

  const handleAddQuestion = () => {
    if (questionText.trim() === '') {
      Alert.alert('Error', 'Please enter a question')
      return
    }

    if (!subjectId) {
      Alert.alert('Error', 'No subject selected')
      return
    }

    if (questionId) {
      store.dispatch(updateQuestionRequest({ subjectId, questionId, question: questionText.trim() }))
    } else {
      store.dispatch(addQuestionRequest({ subjectId, question: questionText.trim() }))
    }
    
    setQuestionText('')
    Alert.alert('Success', 'Question saved successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {questionId ? 'Edit' : 'Add'} Question - {subjectId ? subjectNames[subjectId] : 'Unknown Subject'}
        </Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.label}>Enter your question:</Text>
        <TextInput
          style={styles.textInput}
          value={questionText}
          onChangeText={setQuestionText}
          placeholder="Type your question here..."
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        
        <View style={styles.buttonContainer}>
          <Button
            title={questionId ? "Save" : "Add Question"}
            onPress={handleAddQuestion}
            color="#007AFF"
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            onPress={() => navigation.goBack()}
            color="#FF3B30"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 12,
  },
})

export default AddQuestionScreen