describe('signup', () => {
  context('when the user is new', () => {
    const user = {
      name: 'Ayla Brito',
      email: 'ayla@gmail.com',
      password: '123456',
    }

    before(() => {
      cy.task('removeUser', user.email)
      .then((result) => {
        console.log(result)
      })
    })

    it('should register a new user with success', () => {
      cy.visit('/signup')
  
      cy.get('input[placeholder^="Nome"]').type(user.name)
      cy.get('input[placeholder$="email"]').type(user.email)
      cy.get('input[placeholder*="senha"]').type(user.password)
      cy.contains('button', 'Cadastrar').click()
      
      cy.get('.toast')
        .should('be.visible')
        .find('p')
        .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
    });
  })

  context('when the email already exists in the base data', () => {
    const user = {
      name: 'John',
      email: 'john@example.com',
      password: '123456',
      is_provider: true
    }

    before(() => {
      cy.task('removeUser', user.email)
        .then((result) => {
          console.log(result)
      })

      cy.request('POST', 'http://localhost:3333/users', user).then((response) => {
        expect(response.status).to.eq(200)
      })
    })

    it('should not register a new user and display toast with error message', () => {
      cy.visit('/signup')
      
      cy.get('input[placeholder^="Nome"]').type(user.name)
      cy.get('input[placeholder$="email"]').type(user.email)
      cy.get('input[placeholder*="senha"]').type(user.password)
    
      cy.contains('button', 'Cadastrar').click()
      
      cy.get('.toast')
        .should('be.visible')
        .find('p')
        .should('have.text', 'Email já cadastrado para outro usuário.')
    });
  })
})