import './SearchForm.scss';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PT from 'prop-types';
import cn from 'classnames';
import qs from 'query-string';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';

import { redirect } from 'app_history';
import { resetMovies } from 'redux_actions';

const SearchForm = ({ t, history }) => {
  const dispatch = useDispatch();
  const searchPlaceholder = t('movie_search.input_placeholder');
  const { search = '' } = qs.parse(history.location.search);

  // console.warn('-- SearchForm.render()');
  // console.log('history.location.search:', history.location.search);

  const [searchText, setSearchText] = useState(search);

  useEffect(() => {
    // console.warn('-- SearchForm.useEffect()');

    const unlisten = history.listen((location, action) => {
      const { search = '' } = qs.parse(history.location.search);

      // console.warn('\n SearchForm.listen(), action:', action);
      // console.log('search:', search);

      setSearchText(search);
    });

    return () => {
      // console.warn('-- LocaleDropdown.unmount()');
      unlisten();
    };
  }, [searchText]);

  const onInputChange = (e) => {
    const value = e.target.value;
    const { search } = location;
    const searchObject = qs.parse(search);

    if (value.length >= 2) {
      searchObject.search = value;
      searchObject.page = 1;
    } else {
      delete searchObject.search;
    }

    setSearchText(value);
    dispatch(resetMovies());
    redirect(`/?${qs.stringify(searchObject)}`);
  };

  return (
    <form className="search-form">
      <DebounceInput
        debounceTimeout={300}
        className={cn('form-control', { "active": searchText })}
        type="text"
        name="search"
        placeholder={searchPlaceholder}
        aria-label={searchPlaceholder}
        value={searchText}
        onChange={onInputChange}
      />
    </form>
  );
}

SearchForm.propTypes = {
  t: PT.func.isRequired,

  history: PT.shape({
    location: PT.shape({
      search: PT.string.isRequired
    }).isRequired
  }).isRequired
};

export default withTranslation()(withRouter(SearchForm));