import { configureStore } from '@reduxjs/toolkit';
import assetsSlice from './slices/assetsSlice';

const store = configureStore({
  reducer: {
    assets: assetsSlice
  }
});

export default store;