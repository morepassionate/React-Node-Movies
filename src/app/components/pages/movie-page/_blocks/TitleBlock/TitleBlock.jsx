import './TitleBlock.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';
import moment from 'moment';
import b_ from 'b_';
import cn from 'classnames';

import { withTranslation } from 'react-i18next';

function TitleBlock({ t, cls, data }) {
  const { title, release_date, original_title } = data;
  const b = b_.with(cls);

  return (
    <Fragment>
      <h1>
        <span className={b('title')}>
          {title}
        </span>
        <span className={b('year')}>
          ({moment(release_date).format('YYYY')})
        </span>
      </h1>

      {original_title
        ? (
          <div className={cn(b('original'), 'mb-2')}>
            <span className={b('title')}>
              {original_title}
            </span>
            <span className="ml-1">
              ({t('movie_details.original_title')})
            </span>
          </div>
        )
        : ''}
    </Fragment>
  );
};

TitleBlock.propTypes = {
  cls: PT.string.isRequired,
  t: PT.func.isRequired,

  data: PT.shape({
    title: PT.string,
    release_date: PT.string
  }).isRequired,
};

export default withTranslation()(TitleBlock);