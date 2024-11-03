// store.js
import { configureStore } from '@reduxjs/toolkit';
import setReducer from './features/setsSlice';
import cardsReducer from './features/cardsSlice';

const store = configureStore({
    reducer: {
        set: setReducer,
        cards: cardsReducer,
    },
});

export default store;
