import { Text, View, TextInput, Button, StyleSheet, SafeAreaView, Alert, ScrollView, TouchableOpacity, Platform, PermissionsAndroid } from "react-native"
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { addQuestionAsync, updateQuestionAsync, addAnswerAsync, addVideoAsync } from '../redux/QuestionSlice'
import store from '../redux/Store'

// Direct import for better reliability
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'

const AddQuestionScreen = ({ navigation, route }) => {
  const [questionText, setQuestionText] = useState('')
  const [answerText, setAnswerText] = useState('')
  const { subjectId, questionId, initialText } = route.params || {}
  const { bySubject } = useSelector(state => state.questions)

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
      store.dispatch(updateQuestionAsync({ subjectId, questionId, question: questionText.trim() }))
    } else {
      store.dispatch(addQuestionAsync({ subjectId, question: questionText.trim() }))
    }
    
    setQuestionText('')
    Alert.alert('Success', 'Question added successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ])
  }

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
    Alert.alert('Success', 'Answer added successfully!')
  }

  const requestPermissions = async () => {
    if (Platform.OS !== 'android') {
      return true;
    }

    try {
      // Check if we already have permissions
      const hasCamera = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
      const hasStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      
      if (hasCamera && hasStorage) {
        return true;
      }

      // Request permissions
      const permissions = [];
      if (!hasCamera) {
        permissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);
      }
      if (!hasStorage) {
        permissions.push(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      }

      const granted = await PermissionsAndroid.requestMultiple(permissions);
      
      return Object.values(granted).every(
        permission => permission === PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.warn('Permission request error:', err);
      return false;
    }
  };

  const handleRecordVideo = async () => {
    if (!questionId) {
      Alert.alert('Error', 'No question selected')
      return
    }

    // Check if running on web platform
    if (Platform.OS === 'web') {
      Alert.alert('Not Supported', 'Video recording is not available on web platform. Please use the mobile app.')
      return
    }

    const options = {
      mediaType: 'video',
      videoQuality: 'high',
      durationLimit: 60, // 60 seconds max
      quality: 1,
      includeBase64: false,
      maxHeight: 1080,
      maxWidth: 1920,
    }

    Alert.alert(
      'Record Video',
      'Choose how you want to record the video',
      [
        {
          text: 'Camera',
          onPress: async () => {
            console.log('Launching camera...');
            const hasPermissions = await requestPermissions();
            
            if (hasPermissions) {
              launchCamera(options, handleVideoResponse);
            } else {
              Alert.alert('Permission Denied', 'Camera and storage permissions are required to record videos.');
            }
          },
        },
        {
          text: 'Gallery',
          onPress: async () => {
            console.log('Launching gallery...');
            const hasPermissions = await requestPermissions();
            
            if (hasPermissions) {
              launchImageLibrary(options, handleVideoResponse);
            } else {
              Alert.alert('Permission Denied', 'Storage permission is required to access videos from gallery.');
            }
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    )
  }

  const handleVideoResponse = (response) => {
    console.log('Video response:', response);
    
    if (response.didCancel) {
      console.log('User cancelled video recording');
      return
    }
    
    if (response.errorMessage) {
      console.log('Video recording error:', response.errorMessage);
      Alert.alert('Error', `Video recording failed: ${response.errorMessage}`)
      return
    }

    if (response.assets && response.assets[0]) {
      const video = response.assets[0]
      console.log('Video selected:', video);
      
      store.dispatch(addVideoAsync({ 
        subjectId, 
        questionId, 
        video: {
          uri: video.uri,
          fileName: video.fileName || `video_${Date.now()}.mp4`,
          fileSize: video.fileSize,
          type: video.type || 'video/mp4',
        }
      }))
      Alert.alert('Success', 'Video added successfully!')
    } else {
      console.log('No video assets found in response');
      Alert.alert('Error', 'No video was selected')
    }
  }

  const currentQuestion = questionId && bySubject[subjectId] 
    ? bySubject[subjectId].find(q => q.id === questionId) 
    : null

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {questionId ? 'Edit Question' : 'Add Question'} - {subjectId ? subjectNames[subjectId] : 'Unknown Subject'}
        </Text>
      </View>
      
      <ScrollView style={styles.content}>
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

        {questionId && (
          <>
            <View style={styles.separator} />
            <Text style={styles.label}>Add an answer:</Text>
            <TextInput
              style={styles.textInput}
              value={answerText}
              onChangeText={setAnswerText}
              placeholder="Type your answer here..."
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
            
            <View style={styles.buttonContainer}>
              <Button
                title="Add Answer"
                onPress={handleAddAnswer}
                color="#34C759"
              />
            </View>

          </>
        )}
        
        {questionId && (
          <>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.recordVideoButton}
                onPress={() => {
                  console.log('Record Video button pressed');
                  handleRecordVideo();
                }}
              >
                <Text style={styles.recordVideoButtonText}>📹 Record Video</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.buttonContainer}>
              <Button
                title="Test Video Recording"
                onPress={() => {
                  console.log('Test button pressed');
                  Alert.alert('Test', 'Button is working! Video recording should work now.');
                }}
                color="#007AFF"
              />
            </View>
          </>
        )}
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
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  recordVideoButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  recordVideoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default AddQuestionScreen