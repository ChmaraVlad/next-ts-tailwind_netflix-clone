// Core
import { createSlice } from '@reduxjs/toolkit';

// Types
import * as types from './types';

// Reducers
import * as reducers from './reducers';

const initialState = null

export const movieSlice = createSlice<types.MovieState, typeof reducers>({
    name: 'movie',
    initialState,
    reducers,
});

export const sliceName = movieSlice.name;
export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
