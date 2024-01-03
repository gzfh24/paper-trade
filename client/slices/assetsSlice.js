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

    buyAsset: async (state, action) => {
      state.totalAssets++;
      // iterate through action.payload (portfolio) to update portfolioValue
      state.assetList.push(action.payload)
    },
    sellAsset: (state, action) => {
   
    },
    // syncAssets: (state, action) => {

    // },
    loadAssets: async (state, action) => {
      try {
        const response = await fetch('http://localhost:3000/api/portfolio')
        const data = await response.json();
        console.log(data);
        // data is in form [ARRAY]
        // for (const asset of data) {
        //   state.totalAssets++;
        //   // make a fetch request for each asset to get current price and sum up the value
        // }
      } catch {
          console.log('Load assets failed');
      }
    },
    setCurrentAsset: (state, action) => {
      state.currentAsset = action.payload;
    }
  },
});

export const { buyAsset, sellAsset, syncAssets, loadAssets, setCurrentAsset } = assetsSlice.actions;

export default assetsSlice.reducer;