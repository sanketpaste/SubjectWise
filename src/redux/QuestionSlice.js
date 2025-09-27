import { createSlice } from '@reduxjs/toolkit';

const questionSlice = createSlice({
  name: 'questions',
  initialState: {
    bySubject: { '1': [], '2': [], '3': [], '4': [], '5': [] },
    current: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Subject actions
    setSubjectRequest: (state, action) => {
      state.current = action.payload;
    },
    
    // Add question actions
    addQuestionRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    addQuestionSuccess: (state, action) => {
      state.loading = false;
      const { subjectId, question } = action.payload;
      if (!state.bySubject[subjectId]) state.bySubject[subjectId] = [];
      state.bySubject[subjectId].push({
        id: Date.now().toString(),
        text: question,
        timestamp: new Date().toISOString(),
      });
    },
    addQuestionFailure: (state) => {
      state.loading = false;
      state.error = 'Failed to add question';
    },
    
    // Update question actions
    updateQuestionRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateQuestionSuccess: (state, action) => {
      state.loading = false;
      const { subjectId, questionId, question } = action.payload;
      const list = state.bySubject[subjectId] || [];
      state.bySubject[subjectId] = list.map(q =>
        q.id === questionId ? { ...q, text: question } : q
      );
    },
    updateQuestionFailure: (state) => {
      state.loading = false;
      state.error = 'Failed to update question';
    },
    
    // Delete question actions
    deleteQuestionRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteQuestionSuccess: (state, action) => {
      state.loading = false;
      const { subjectId, questionId } = action.payload;
      if (state.bySubject[subjectId]) {
        state.bySubject[subjectId] = state.bySubject[subjectId].filter(
          q => q.id !== questionId
        );
      }
    },
    deleteQuestionFailure: (state) => {
      state.loading = false;
      state.error = 'Failed to delete question';
    },
  },
});

export const {
  setSubjectRequest,
  addQuestionRequest,
  addQuestionSuccess,
  addQuestionFailure,
  updateQuestionRequest,
  updateQuestionSuccess,
  updateQuestionFailure,
  deleteQuestionRequest,
  deleteQuestionSuccess,
  deleteQuestionFailure,
} = questionSlice.actions;

export default questionSlice.reducer;
