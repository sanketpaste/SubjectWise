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

export const addAnswerAsync = createAsyncThunk(
  'questions/addAnswer',
  async ({ subjectId, questionId, answer }) => {
    await delay(150);
    return { subjectId, questionId, answer };
  }
);

export const addVideoAsync = createAsyncThunk(
  'questions/addVideo',
  async ({ subjectId, questionId, video }) => {
    await delay(150);
    return { subjectId, questionId, video };
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
          answers: [],
          videos: [],
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
      })

      .addCase(addAnswerAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(addAnswerAsync.fulfilled, (state, action) => {
        const { subjectId, questionId, answer } = action.payload;
        const list = state.bySubject[subjectId] || [];
        state.bySubject[subjectId] = list.map(q => {
          if (q.id === questionId) {
            return {
              ...q,
              answers: [...(q.answers || []), {
                id: Date.now().toString(),
                text: answer,
                timestamp: new Date().toISOString(),
              }]
            };
          }
          return q;
        });
      })
      .addCase(addAnswerAsync.rejected, (state) => {
        state.error = 'Failed to add answer';
      })

      .addCase(addVideoAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(addVideoAsync.fulfilled, (state, action) => {
        const { subjectId, questionId, video } = action.payload;
        const list = state.bySubject[subjectId] || [];
        state.bySubject[subjectId] = list.map(q => {
          if (q.id === questionId) {
            return {
              ...q,
              videos: [...(q.videos || []), {
                id: Date.now().toString(),
                uri: video.uri,
                fileName: video.fileName,
                fileSize: video.fileSize,
                type: video.type,
                timestamp: new Date().toISOString(),
              }]
            };
          }
          return q;
        });
      })
      .addCase(addVideoAsync.rejected, (state) => {
        state.error = 'Failed to add video';
      });
  },
});

export const { setSubject, deleteQuestion } = slice.actions;
export default slice.reducer;
export { slice as questionsSlice };
