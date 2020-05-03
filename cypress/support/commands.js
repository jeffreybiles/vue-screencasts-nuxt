// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add("login", (email = 'admin@user.com', password = 'aaaaaaaa') => {
  cy.window().its('app')
  cy.window().then((window) => {
    window.app.$auth.loginWith('local', {
      data: {
        name: '',
        email: email,
        password: password,
        agreeToTerms: false,
        email_daily: true,
        email_weekly: true
      }
    })
    cy.window()
      .its('app.store')
      .its('state.auth.loggedIn')
      .should('equal', true);
  })
})

Cypress.Commands.add("logout", () => {
  cy.window().its('app')
  cy.window().then((window) => {
    window.app.$auth.logout()
  })
  cy.window()
    .its('app.store')
    .its('state.auth.loggedIn')
    .should('equal', false);
})
