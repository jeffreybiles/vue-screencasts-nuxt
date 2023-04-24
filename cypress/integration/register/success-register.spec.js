export function register(user, email, password) {
  cy.visit('/auth');
  cy.contains('a', 'Click here to register').click();
  cy.contains('div.v-text-field__slot', 'Name').children('input').type(user);
  cy.contains('div.v-text-field__slot', 'Email').children('input').type(email);
  cy.get('input[type=password]').type(password);
  cy.contains('div.v-input__slot', 'I have read and agree').children('.v-input--selection-controls__input').click()
  cy.contains('button', 'Register').click();
}


describe('Success register', () => {
  it('is logged out', () => {
    cy.visit('/')
      .window()
      .its('app.store')
      .its('state.auth.loggedIn')
      .should('equal', false);
  });

  it('can register', () => {
    cy.server()
    cy.route('POST', '/api/users').as('new-user')

    register('New test user', 'newuser@user.com', 'aaaaaaaa');

    cy.wait('@new-user')
      .should('have.property', 'status', 200)
    cy.window()
      .its('app.store')
      .its('state.auth.loggedIn')
      .should('equal', true);
  });

});
