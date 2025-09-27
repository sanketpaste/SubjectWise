import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchMoviesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMoviesSuccess: (state, action) => {
      state.loading = false;
      state.movies = action.payload;
    },
    fetchMoviesFailure: (state) => {
      state.loading = false;
      state.error = 'Failed to fetch movies';
    },
  },
});

export const { fetchMoviesRequest, fetchMoviesSuccess, fetchMoviesFailure } = moviesSlice.actions;
export default moviesSlice.reducer;
