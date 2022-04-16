import loginPage from '../support/pages/login'
import dashboardPage from '../support/pages/dashboard'

describe('login', () => {
  context('when user is good', () => {
    const user = {
      name: 'Robson',
      email: 'robson@example.com',
      password: '123456',
    }

    it('should be success logged', () => {
      loginPage.go()
      loginPage.form(user)
      loginPage.submit()

      dashboardPage.userLoggedIn(user.name)
    });
  })
})