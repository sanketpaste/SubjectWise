import { Platform } from 'react-native';

// Platform-specific utilities to handle native module imports safely

export const getImagePicker = () => {
  try {
    if (Platform.OS === 'web') {
      return null;
    }
    
    const imagePicker = require('react-native-image-picker');
    return {
      launchImageLibrary: imagePicker.launchImageLibrary,
      launchCamera: imagePicker.launchCamera,
      available: true
    };
  } catch (error) {
    console.log('Image picker not available:', error.message);
    return { available: false };
  }
};

export const getVideoPlayer = () => {
  try {
    if (Platform.OS === 'web') {
      return null;
    }
    
    const videoModule = require('react-native-video');
    return {
      Video: videoModule.default,
      available: true
    };
  } catch (error) {
    console.log('Video player not available:', error.message);
    return { available: false };
  }
};

export const isNativePlatform = () => {
  return Platform.OS === 'ios' || Platform.OS === 'android';
};
