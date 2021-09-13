import styles from './Footer.module.scss';

import React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import tmdbLogo from '@/assets/img/tmdb-logos/tmdb_logo.svg';
import FooterLink from './FooterLink';

const revisionText = process.env.APP_REVISION
  ? ` | Revision: ${process.env.APP_REVISION}`
  : '';

const Footer = () => (
  <footer className={cn(styles.footer, 'text-center p-3')}>
    <div className="container">
      <FooterLink
        url="https://github.com/nk11dev"
        textBefore="© 2021,"
        textAfter={revisionText || ';'}
        cls="mr-2"
      >
        <FontAwesomeIcon
          className="mx-1"
          icon={faGithub}
        />
        nk11dev
      </FooterLink>

      <FooterLink
        url="https://www.themoviedb.org/"
        textBefore="This product uses the TMDb API but is not endorsed or certified by TMDb "
        cls={styles.tmdbLogo}
      >
        <img
          width="85"
          height="12"
          className="ml-1"
          src={tmdbLogo}
        />
      </FooterLink>
    </div>
  </footer>
);

export default Footer;