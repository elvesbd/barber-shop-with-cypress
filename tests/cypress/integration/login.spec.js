import loginPage from '../support/pages/login'
import dashboardPage from '../support/pages/dashboard'

describe('login', () => {
  context('when user is good', () => {
    const user = {
      name: 'Robson',
      email: 'robson@example.com',
      password: '123456',
      is_provider: true,
    }

    before(() => {
      cy.postUser(user)
    })

    it('should be success logged', () => {
      loginPage.go()
      loginPage.form(user)
      loginPage.submit()

      dashboardPage.header.userLoggedIn(user.name)
    });
  })
})

context.only('when user is good but password is incorrect', () => {
  let user = {
    name: 'Celso Kamura',
    email: 'kamura@gmail.com',
    password: '123456',
    is_provider: true,
  }

  before(() => {
    cy.postUser(user).then(() => {
      user.password = 'abc123'
    })
  })

  it('should return a credentials error', () => {
    loginPage.go()
    loginPage.form(user)
    loginPage.submit()

    const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
    loginPage.toast.shouldHaveText(message)

    cy.wait(5000)
  });
})