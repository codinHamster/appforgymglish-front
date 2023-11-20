import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const userSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addCountry: (state, action) => {
      state.value.push(action.payload);
    },
    removeCountry: (state, action) => {
      state.value = state.value.filter(country => country.name !== action.payload);
    },

    removeAllCountry: (state) => {
      state.value = [];
    },
  },
});

export const { addCountry, removeCountry, removeAllCountry } = userSlice.actions;
export default userSlice.reducer;
