import ApiService from 'app_services/ApiMovies.service';

import {
  DEFAULT_MOVIES_LIST,
  DEFAULT_MOVIES_FILTER
} from 'app_redux/movies-list/movies-list.reducer';

import {
  MOVIES_LIST_PENDING,
  MOVIES_LIST_SUCCESS,
  MOVIES_LIST_ERROR
} from 'app_redux/movies-list/movies-list.constants';

import {
  MOVIES_GENRES_IS_LOADING,
  MOVIES_GENRES_LOADING_SUCCESS,
  MOVIES_GENRES_LOADING_ERROR
} from 'app_redux/movies-genres/movies-genres.constants';

function setSuccesGenres({ data }) {
  return {
    type: MOVIES_GENRES_LOADING_SUCCESS,
    genresWasFetched: true,
    genresIsLoading: false,
    genresHasErrors: false,
    data
  };
}

function setSuccesMovies({ data }) {
  return {
    type: MOVIES_LIST_SUCCESS,
    data
  };
}

function setLoadingMovies() {
  return {
    type: MOVIES_LIST_PENDING
  };
}

function setLoadingGenres(genresIsLoading) {
  return {
    type: MOVIES_GENRES_IS_LOADING,
    genresIsLoading
  };
}

function setErrorMovies(error) {
  return {
    type: MOVIES_LIST_ERROR,
    error
  };
}

function setErrorGenres(genresHasErrors) {
  return {
    type: MOVIES_GENRES_LOADING_ERROR,
    genresIsLoading: false,
    genresHasErrors
  };
}

function loadMoviesList(moviesParams = {}) {
  return async (dispatch, getState) => {
    const { moviesGenres } = getState();

    // список жанров фильмов
    if (!moviesGenres.genresWasFetched) {
      try {
        dispatch(setLoadingGenres(true));

        const responseGenres = await ApiService.fetch({ url: '/genre/movie/list' });

        let dataGenres;
        if (responseGenres.ok) {
          dataGenres = await responseGenres.json();
          dispatch(setSuccesGenres({
            data: dataGenres
          }));
        } else {
          dataGenres = await responseGenres.text().then(text => { throw new Error(text) });
        }
      } catch (error) {
        dispatch(setErrorGenres(error.message));
      }
    }

    // список фильмов
    const {
      page = DEFAULT_MOVIES_LIST.movies.page,
      moviesType = DEFAULT_MOVIES_FILTER
    } = moviesParams;
    const url = `/movie/${moviesType}`;
    const urlParams = `&page=${page}`;

    try {
      dispatch(setLoadingMovies());

      const responseMovies = await ApiService.fetch({ url, urlParams });

      let dataMovies;
      if (responseMovies.ok) {
        dataMovies = await responseMovies.json();
        dispatch(setSuccesMovies({
          data: dataMovies
        }));
      } else {
        dataMovies = await responseMovies.text().then(text => { throw new Error(text) });
      }

    } catch (error) {
      dispatch(setErrorMovies(error.message));
    }
  };

}

export {
  loadMoviesList
};