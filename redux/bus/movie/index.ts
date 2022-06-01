// Core
import { useDispatch } from 'react-redux';

// Tools
import { useSelector } from '../../../tools/hooks';

// types
import { Movie } from '../../../types';

// reducers
import { movieActions } from './slice';

export const useMovie = () => {
    const dispatch = useDispatch();

    const movie = useSelector((state) => state.movie);

    return {
        movie,
        addCurrentMovie: (movie: Movie) => dispatch(movieActions.setMovie(movie)),
    }
};

