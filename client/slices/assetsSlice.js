import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalAssets: 0,
  portfolioValue: 0,
  cashValue: 0,
  assetList: [],
  currentAsset: ''
}

export const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {

    // buyAsset: async (state, action) => {
    //   return;
    //   // state.totalAssets++;
    //   // // iterate through action.payload (portfolio) to update portfolioValue
    //   // state.assetList.push(action.payload)
    // },
    // sellAsset: (state, action) => {
   
    // },
    // // syncAssets: (state, action) => {

    // // },
    loadAssets: (state, action) => {
      state.totalAssets = action.payload.totalAssets;
      state.portfolioValue = action.payload.portfolioValue;
      state.cashValue = action.payload.cashValue;
      state.assetList = action.payload.assetList;
    },
    setCurrentAsset: (state, action) => {
      state.currentAsset = action.payload;
    }
  },
});

export const { buyAsset, sellAsset, syncAssets, loadAssets, setCurrentAsset } = assetsSlice.actions;

export default assetsSlice.reducer;