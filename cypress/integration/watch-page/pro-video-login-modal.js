describe('Continue course watch', () => {

  it('is logged out', () => {
    cy.visit('/watch/242')
      .window()
      .its('app.store')
      .its('state.auth.loggedIn')
      .should('equal', false);
  });

  it('pro video page', () => {
    cy.contains('.v-dialog', 'This is a Pro video')
  });

  it('show login modal at the pro video page', () => {
    cy.contains('.v-dialog #authButton', 'Login')
  });


});
