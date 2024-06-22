import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiKey = import.meta.env.VITE_API_KEY;

export const fetchNews = createAsyncThunk('news/fetchNews', async ({ category, page, search }) => {
  let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=10`;
  if (search) {
    url = `https://newsapi.org/v2/everything?q=${search}&apiKey=${apiKey}&page=${page}&pageSize=10`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    currentPage: 1,
    totalResults: 0,
    category: 'general',
    search: '',
    status: 'idle',
    error: null,
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      state.currentPage = 1;
      state.search = '';
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      state.currentPage = 1;
    },
    nextPage: (state) => {
      state.currentPage += 1;
    },
    previousPage: (state) => {
      state.currentPage = Math.max(state.currentPage - 1, 1);
    },
    toggleFavorite: (state, action) => {
      const article = action.payload;
      const existingIndex = state.favorites.findIndex(fav => fav.url === article.url);
      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1);
      } else {
        state.favorites.push(article);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCategory, setSearch, nextPage, previousPage, toggleFavorite } = newsSlice.actions;

export default newsSlice.reducer;