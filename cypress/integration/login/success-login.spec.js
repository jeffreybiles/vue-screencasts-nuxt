function login(user, password) {
  cy.visit('/auth');
  cy.get('input[type=text]').type(user);
  cy.get('input[type=password]').type(password);
  cy.get('button#authButton').click();
}

describe('Success login', () => {

  it('is logged out', () => {
    cy.visit('/')
      .window()
      .its('app.store')
      .its('state.auth.loggedIn')
      .should('equal', false);
  });

  it('can log in', () => {
    login('admin@user.com', 'aaaaaaaa');

    cy.window()
      .its('app.store')
      .its('state.auth.loggedIn')
      .should('equal', true);
  });

  it('logged in', () => {
    cy.contains('header', 'admin@user.com');
    cy.contains('header', 'Logout');
  });

});

