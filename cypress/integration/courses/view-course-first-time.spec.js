describe('View course first time', () => {

  before(() => {
    cy.visit('/')
    cy.login()
  })

  it('has courses', () => {
    cy.contains('a', 'Courses').click()
    cy.get('a[data-cy="course-link"]').should('have.attr', 'href').and('match', /courses\/(\d+)/)
  });

  it('navigates to course page', () => {
    cy.get('div[data-cy="course-card"]').first().click()
  });

  it('played first time', () => {
    cy.get('.scroll-box .video-row:first').should('have.class', 'active')
  })

});
