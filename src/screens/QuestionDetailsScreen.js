import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { addAnswerAsync } from '../redux/QuestionSlice'
import store from '../redux/Store'
import { useState } from 'react'
import { TextInput, Button } from 'react-native'

// Direct import for better reliability
import Video from 'react-native-video'

const QuestionDetailsScreen = ({ navigation, route }) => {
  const { subjectId, questionId } = route.params || {}
  const { bySubject } = useSelector(state => state.questions)
  const [answerText, setAnswerText] = useState('')
  const [showAddAnswer, setShowAddAnswer] = useState(false)

  const subjectNames = {
    '1': 'React Native',
    '2': 'Flutter', 
    '3': 'Python',
    '4': 'Node',
    '5': 'JavaScript'
  }

  const currentQuestion = questionId && bySubject[subjectId] 
    ? bySubject[subjectId].find(q => q.id === questionId) 
    : null

  const handleAddAnswer = () => {
    if (answerText.trim() === '') {
      Alert.alert('Error', 'Please enter an answer')
      return
    }

    if (!questionId) {
      Alert.alert('Error', 'No question selected')
      return
    }

    store.dispatch(addAnswerAsync({ subjectId, questionId, answer: answerText.trim() }))
    setAnswerText('')
    setShowAddAnswer(false)
    Alert.alert('Success', 'Answer added successfully!')
  }

  if (!currentQuestion) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Question not found</Text>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            color="#007AFF"
          />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Question Details - {subjectId ? subjectNames[subjectId] : 'Unknown Subject'}
        </Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionLabel}>Question:</Text>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
        </View>

        {currentQuestion.videos && currentQuestion.videos.length > 0 && (
          <View style={styles.videosSection}>
            <Text style={styles.videosLabel}>
              Videos ({currentQuestion.videos.length})
            </Text>
            {currentQuestion.videos.map((video, index) => (
              <View key={video.id} style={styles.videoItem}>
                {Platform.OS !== 'web' ? (
                  <Video
                    source={{ uri: video.uri }}
                    style={styles.videoPlayer}
                    controls={true}
                    resizeMode="contain"
                    onError={(error) => {
                      console.log('Video playback error:', error);
                    }}
                    onLoad={() => {
                      console.log('Video loaded successfully');
                    }}
                  />
                ) : (
                  <View style={styles.videoPlaceholder}>
                    <Text style={styles.videoPlaceholderText}>
                      📹 Video not supported on this platform
                    </Text>
                  </View>
                )}
                <Text style={styles.videoFileName}>{video.fileName}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.answersSection}>
          <View style={styles.answersHeader}>
            <Text style={styles.answersLabel}>
              Answers ({currentQuestion.answers ? currentQuestion.answers.length : 0})
            </Text>
            <TouchableOpacity 
              style={styles.addAnswerButton}
              onPress={() => setShowAddAnswer(!showAddAnswer)}
            >
              <Text style={styles.addAnswerButtonText}>
                {showAddAnswer ? 'Cancel' : '+ Add Answer'}
              </Text>
            </TouchableOpacity>
          </View>

          {showAddAnswer && (
            <View style={styles.addAnswerContainer}>
              <TextInput
                style={styles.answerInput}
                value={answerText}
                onChangeText={setAnswerText}
                placeholder="Type your answer here..."
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
              <View style={styles.addAnswerActions}>
                <Button
                  title="Add Answer"
                  onPress={handleAddAnswer}
                  color="#34C759"
                />
                <Button
                  title="Cancel"
                  onPress={() => {
                    setShowAddAnswer(false)
                    setAnswerText('')
                  }}
                  color="#FF3B30"
                />
              </View>
            </View>
          )}

          {currentQuestion.answers && currentQuestion.answers.length > 0 ? (
            currentQuestion.answers.map((answer, index) => (
              <View key={answer.id} style={styles.answerItem}>
                <Text style={styles.answerText}>{answer.text}</Text>
              </View>
            ))
          ) : (
            <View style={styles.noAnswersContainer}>
              <Text style={styles.noAnswersText}>No answers yet. Be the first to answer!</Text>
            </View>
          )}
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  questionContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  questionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    color: '#333',
    lineHeight: 24,
  },
  videosSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  videosLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  videoItem: {
    marginBottom: 16,
  },
  videoPlayer: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
    borderRadius: 8,
  },
  videoPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  videoPlaceholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  videoFileName: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  answersSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  answersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  answersLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addAnswerButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addAnswerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addAnswerContainer: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  answerInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    marginBottom: 12,
  },
  addAnswerActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  answerItem: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#34C759',
  },
  answerText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  noAnswersContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noAnswersText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
})

export default QuestionDetailsScreen
