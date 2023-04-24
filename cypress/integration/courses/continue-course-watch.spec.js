describe('Continue course watch', () => {

  before(() => {
    cy.visit('/')
    cy.login()
  })

  it('navigates to course page', () => {
    cy.contains('a', 'Courses').click()
    cy.get('div[data-cy="course-card"]:first').click()
  });

  it('can mark video played', () => {
    cy.contains('button', 'Mark Played').click()
    cy.contains('a', 'Courses').click()
  })

  it('first video marked as played', () => {
    cy.get('div[data-cy="course-card"]:first').click()
    cy.get('.scroll-box .video-row:first').find('svg[data-icon="check"]').should('exist')
  })

  it('progress bar shows progress', () => {
    cy.get('.v-progress-linear').invoke('attr', 'aria-valuenow').should('be.greaterThan', 0)
  })

});
