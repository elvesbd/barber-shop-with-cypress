it('web app must be online', () => {
  cy.visit('/')
  
  cy.title().should('eq', 'Samurai Barbershop by QAninja')
});