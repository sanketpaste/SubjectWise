
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://www.omdbapi.com/?s=batman&apikey=564727fa';


export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.Search; 
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch movies';
      });
  },
});

export default moviesSlice.reducer;
