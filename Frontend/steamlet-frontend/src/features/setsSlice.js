// features/setsSlice.js
// features/setSlice.js
import { createSlice } from '@reduxjs/toolkit';

const setSlice = createSlice({
    name: 'set',
    initialState: {
        setId: null,
    },
    reducers: {
        setSetId: (state, action) => {
            state.setId = action.payload; // Set the selected set ID
        },
        clearSetId: (state) => {
            state.setId = null; // Clear the selected set ID
        },
    },
});

export const { setSetId, clearSetId } = setSlice.actions;
export default setSlice.reducer;
