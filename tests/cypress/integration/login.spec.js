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

  context('when user is good but password is incorrect', () => {
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

  context('when format email is incorrect', () => {
    const emails = [
      'test.com.br',
      'yahoo.com',
      '@gmail.com',
      '@',
      'test@',
      '111',
      '&*^&^*',
      'pwd123'
    ]

    before(() => {
      loginPage.go()
    })

    emails.forEach((email) => {
      it(`must not log in with email: ${email}`, () => {
        const user = {
          email: email,
          password:'pwd123'
        }

        loginPage.form(user)
        loginPage.submit()
        loginPage.alert.haveText('Informe um email válido')
      });
    })
  })

  context('when no form field and filled', () => {
    const alertMessages = [
      'E-mail é obrigatório',
      'Senha é obrigatória',
    ]

    before(() => {
      loginPage.go()
      loginPage.submit()
    })

    alertMessages.forEach((message) => {
      it(`must display ${message.toLowerCase()}`, () => {
        loginPage.alert.haveText(message)
      });
    })
  })
})

 