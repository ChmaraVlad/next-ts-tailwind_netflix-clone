// Core
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

// types
import { Movie } from '../../../types';

export type Movies = Array<Movie>

export type MovieState = Movie | null

// Contracts
export type BaseContact<T = any> = CaseReducer<MovieState, PayloadAction<T>>
