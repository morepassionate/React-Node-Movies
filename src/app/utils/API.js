import qs from 'query-string';

import { formatLng } from '@/utils/common';

require('isomorphic-fetch');

function* fetchJson(url, { method }) {
  const options = { method };

  if (process.env.TMDB_API_V4_AUTHENTICATION === '1') {
    if (!process.env.TMDB_API_ACCESS_TOKEN) {
      throw new Error('Error in API module: "TMDB_API_ACCESS_TOKEN env variable is empty"');
    }

    options.headers = {
      'Authorization': `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`
    };
  }

  const response = yield fetch(url, options);

  if (response.ok) {
    return yield response.json();
  }

  return yield response
    .text()
    .then((text) => { throw new Error(text); });
}

export default {
  fetch({ url = '', params = {} }) {
    try {
      const queryObject = (({
        lng, query, page, region
      }) => ({
        ...(typeof lng !== 'undefined' && {
          language: lng ? formatLng(lng) : null
        }),
        query,
        page,
        region
      }))(params);

      if (process.env.TMDB_API_V4_AUTHENTICATION === '0') {
        if (process.env.TMDB_API_KEY) {
          queryObject.api_key = process.env.TMDB_API_KEY;
        } else {
          throw new Error('TMDB_API_KEY env variable is empty');
        }
      }

      const queryString = qs.stringify(queryObject);

      const fetchUrl = `${process.env.TMDB_API_HOST}${url}?${queryString}`;

      return fetchJson(fetchUrl, { method: 'GET' });

    } catch (error) {
      throw new Error(`Error in API module: "${error.message}"`);
    }
  }
};