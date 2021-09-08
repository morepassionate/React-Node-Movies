import { MoviesListPage as MLP } from '../page-objects';

describe('4) MOVIES LIST: PAGING', () => {

  it('4.1.1: Page 1 button is active by default', () => {
    cy.visit(`${Cypress.env('homeUrl')}?moviesType=top_rated&page=1`);
    MLP.paginationLinkActive().should('contain', 1);
  });

  it('4.1.2: First movie card of page 1 has title, genres and rating', () => {
    MLP.checkFirstMovieCard();
  });

  it('4.2.1: Page number can be changed by clicking page 2 button', () => {
    MLP.clickPageButton(2);
  });

  it('4.2.2: Url has changed by clicking page 2 button', () => {
    cy.url().should('include', 'page=2');
  });

  it('4.2.3: Page 2 button is active', () => {
    MLP.paginationLinkActive().should('contain', 2);
  });

  it('4.2.4: First movie card of page 2 has title, genres and rating', () => {
    MLP.checkFirstMovieCard();
  });

  it('4.3.1: Page number can be changed by clicking "next" page button', () => {
    MLP.clickPageNext();
  });

  it('4.3.2: Url has changed by clicking "next" page button', () => {
    cy.url().should('include', 'page=3');
  });

  it('4.3.3: Page 3 button is active', () => {
    MLP.paginationLinkActive().should('contain', 3);
  });

  it('4.3.4: First movie card of page 3 has title, genres and rating', () => {
    MLP.checkFirstMovieCard();
  });

  it('4.4.1: Page number can be changed by clicking "..." page button', () => {
    MLP.clickBreakPage();
  });

  it('4.4.2: Url has changed by clicking "..." page button', () => {
    cy.url().should('include', 'page=5');
  });

  it('4.4.3: Page 5 button is active', () => {
    MLP.paginationLinkActive().should('contain', 5);
  });

  it('4.4.4: First movie card of page 5 has title, genres and rating', () => {
    MLP.checkFirstMovieCard();
  });
})