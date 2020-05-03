describe('Continue course watch', () => {
  before(() => {
    cy.visit('/watch/242')
    cy.login('free')
  })

  it('pro video page', () => {
    cy.contains('.v-dialog', 'This is a Pro video')
  });

  it('modal shows go pro button', () => {
    cy.contains('.v-dialog a', 'Go Pro')
  });

  it('navigates to bronze plan order', () => {
    cy.contains('.v-dialog a', 'Go Pro').click()
    cy.url().should('match', /order\?plan\=/)
  })

});
