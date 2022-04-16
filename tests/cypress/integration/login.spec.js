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
      cy.task('removeUser', user.email)
        .then((result) => {
          console.log(result)
        })

      cy.request('POST', 'http://localhost:3333/users', user).then((response) => {
        expect(response.status).to.eq(200)
      })
    })

    it('should be success logged', () => {
      loginPage.go()
      loginPage.form(user)
      loginPage.submit()

      dashboardPage.header.userLoggedIn(user.name)
    });
  })
})