// features/setsSlice.js
// features/setSlice.js
import { createSlice } from '@reduxjs/toolkit';

const setSlice = createSlice({
    name: 'set',
    initialState: {
        setId: null,
        setName: '',
    },
    reducers: {
        setSetId: (state, action) => {
            state.setId = action.payload; // Set the selected set ID
        },
        clearSetId: (state) => {
            state.setId = null; // Clear the selected set ID
        },
        setSetName: (state, action) => {
            state.setName = action.payload;
        },
        clearSetName: (state) => {
            state.setName = null;
        }
    },
});

export const { setSetId, clearSetId, setSetName, clearSetName } = setSlice.actions;
export default setSlice.reducer;
