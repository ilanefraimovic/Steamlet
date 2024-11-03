// features/cardsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cardsSlice = createSlice({
    name: 'cards',
    initialState: [],
    reducers: {
        setCards: (state, action) => {
            state = action.payload;
        },
        addCard: (state, action) => {
            state.push(action.payload);
        },
        removeCard: (state, action) => {
            return state.filter(card => card.id !== action.payload);
        },
        updateCard: (state, action) => {
            const index = state.findIndex(card => card.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        }
    }
});

export const { setCards, addCard, removeCard, updateCard } = cardsSlice.actions;
export default cardsSlice.reducer;
