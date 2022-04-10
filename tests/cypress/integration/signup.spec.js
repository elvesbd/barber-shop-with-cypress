describe('signup', () => {
  const user = {
    name: 'Ayla Brito',
    email: 'ayla@gmail.com',
    password: '123456',
  }

  it('should register a new user', () => {
    cy.task('removeUser', user.email)
      .then((result) => {
        console.log(result)
      })
  
    cy.visit('/signup')
    
    cy.get('input[placeholder="Nome"]').type(user.name)
    cy.get('input[placeholder="E-mail"]').type(user.email)
    cy.get('input[placeholder="Senha"]').type(user.password)
  
    cy.contains('button', 'Cadastrar').click()
    
    cy.get('.toast')
      .should('be.visible')
      .find('p')
      .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
  });
  
  it('should not register a new user and display toast with error message', () => {
    cy.visit('/signup')
    
    cy.get('input[placeholder="Nome"]').type(user.name)
    cy.get('input[placeholder="E-mail"]').type(user.email)
    cy.get('input[placeholder="Senha"]').type(user.password)
  
    cy.contains('button', 'Cadastrar').click()
    
    cy.get('.toast')
      .should('be.visible')
      .find('p')
      .should('have.text', 'Email já cadastrado para outro usuário.')
  });
})