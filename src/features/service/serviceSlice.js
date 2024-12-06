import { createSlice } from '@reduxjs/toolkit';

const serviceSlice = createSlice({
  name: 'service',
  initialState: {
    selectedService: null,
  },
  reducers: {
    setService: (state, action) => {
      state.selectedService = action.payload;
    },
  },
});

export const { setService } = serviceSlice.actions;

export default serviceSlice.reducer;
