function login(user, password) {
  cy.visit('/auth');
  cy.get('input[type=text]').type(user);
  cy.get('input[type=password]').type(password);
  cy.get('button#authButton').click();
}

describe('Failed login with incorrect password', () => {
  it('is logged out', () => {
    cy.visit('/')
      .window()
      .its('app.store')
      .its('state.auth.loggedIn')
      .should('equal', false);
  });

  it('failed to login', () => {
    login('admin@user.com', 'aaaaaaa1');

    cy.window()
      .its('app.store')
      .its('state.auth.loggedIn')
      .should('equal', false);

    cy.contains('There was an issue');
  });
});
