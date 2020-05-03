const loginUrl = '/api/sessions';
const userUrl = '/api/sessions/user';

function login() {
  cy.visit('/auth');
  cy.get('input[type=text]').type('admin@user.com');
  cy.get('input[type=password]').type('aaaaaaaa');
  cy.get('button#authButton').click();
}

function mockLoginResponse() {
  cy.server();
  cy.fixture('user-login-success.json').as('userLoginSuccessJson');
  cy.fixture('user-details.json').as('userDetailsJson');
  cy.route({
    method: 'POST',
    url: loginUrl,
    response: '@userLoginSuccessJson',
  }).as('mockLoginSuccess');
  cy.route({
    method: 'GET',
    url: userUrl,
    response: '@userDetailsJson',
  });
}

describe('User', () => {
  it('is logged out', () => {
    cy.visit('/')
      .window()
      .its('app.store')
      .its('state.auth.loggedIn')
      .should('equal', false);
  });

  it('can log in', () => {
    mockLoginResponse();

    login();

    cy.window()
      .its('app.store')
      .its('state.auth.loggedIn')
      .should('equal', true);
  });
});
