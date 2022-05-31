// Core
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import togglers from './bus/client/togglers';
import movie from './bus/movie/slice';
// import __entityName__ from '../../bus/__entityName__/slice';

// Middleware
import { middleware } from './middleware';

export const store = configureStore({
     reducer: {
          togglers,
          movie,
          // __entityName__,
     },
     middleware,
     devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>
