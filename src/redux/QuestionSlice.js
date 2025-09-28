import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const delay = (ms) => new Promise(r => setTimeout(r, ms));

export const fetchBySubject = createAsyncThunk(
  'questions/fetchBySubject',
  async (subjectId) => {
    await delay(200);
    return { subjectId };
  }
);

export const addQuestionAsync = createAsyncThunk(
  'questions/addQuestion',
  async ({ subjectId, question }) => {
    await delay(150);
    return { subjectId, question };
  }
);

export const updateQuestionAsync = createAsyncThunk(
  'questions/updateQuestion',
  async ({ subjectId, questionId, question }) => {
    await delay(150);
    return { subjectId, questionId, question };
  }
);

const slice = createSlice({
  name: 'questions',
  initialState: {
    bySubject: { '1': [], '2': [], '3': [], '4': [], '5': [] },
    current: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSubject: (state, action) => {
      state.current = action.payload;
    },
    deleteQuestion: (state, action) => {
      const { subjectId, questionId } = action.payload;
      if (state.bySubject[subjectId]) {
        state.bySubject[subjectId] = state.bySubject[subjectId].filter(
          q => q.id !== questionId
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBySubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBySubject.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.subjectId;
        if (!state.bySubject[action.payload.subjectId]) state.bySubject[action.payload.subjectId] = [];
      })
      .addCase(fetchBySubject.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load';
      })

      .addCase(addQuestionAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(addQuestionAsync.fulfilled, (state, action) => {
        const { subjectId, question } = action.payload;
        if (!state.bySubject[subjectId]) state.bySubject[subjectId] = [];
        state.bySubject[subjectId].push({
          id: Date.now().toString(),
          text: question,
          timestamp: new Date().toISOString(),
        });
      })
      .addCase(addQuestionAsync.rejected, (state) => {
        state.error = 'Failed to add';
      })

      .addCase(updateQuestionAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(updateQuestionAsync.fulfilled, (state, action) => {
        const { subjectId, questionId, question } = action.payload;
        const list = state.bySubject[subjectId] || [];
        state.bySubject[subjectId] = list.map(q =>
          q.id === questionId ? { ...q, text: question } : q
        );
      })
      .addCase(updateQuestionAsync.rejected, (state) => {
        state.error = 'Failed to update';
      });
  },
});

export const { setSubject, deleteQuestion } = slice.actions;
export default slice.reducer;
export { slice as questionsSlice };
