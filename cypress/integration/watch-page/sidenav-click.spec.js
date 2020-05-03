describe('Continue course watch', () => {

  it('navigate to /watch/20', () => {
    cy.visit('/watch/20')
  })

  it('navigates to another video with sidenav click', () => {
    cy.get('.scroll-box .video-row:not(.active)').first().click()
    cy.url().should('not.match', /watch\/20/)
  })

});
