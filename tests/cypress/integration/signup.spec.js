it('should register a new user', () => {
  const name = 'Ayla Brito'
  const email = 'ayla@gmail.com'
  const password = '123456'

  cy.task('removeUser', email)
    .then((result) => {
      console.log(result)
    })

  cy.visit('/signup')
  
  cy.get('input[placeholder="Nome"]').type(name)
  cy.get('input[placeholder="E-mail"]').type(email)
  cy.get('input[placeholder="Senha"]').type(password)

  /* interceptando a chamada api para evitar que o cadastro seja efetuado no banco de dados
  cy.intercept('POST', '/users', {
    statusCode: 200,
  }).as('postUser') */

  cy.contains('button', 'Cadastrar').click()

  //cy.wait('@postUser')
  
  cy.get('.toast')
    .should('be.visible')
    .find('p')
    .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!')
});
