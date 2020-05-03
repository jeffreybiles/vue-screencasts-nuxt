describe('Continue course watch', () => {

  it('shows 4 testimonials on the watch page', () => {
    cy.visit('/watch/20')
      .get('.testimonial')
      .should('have.length', 4)
  })


});
