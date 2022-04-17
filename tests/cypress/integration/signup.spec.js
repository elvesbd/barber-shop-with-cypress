import signupPage from '../support/pages/signup'

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
      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
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
     cy.postUser(user)
    })

    it('should not register a new user and display toast with error message', () => {
      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
    });
  })

  context('when show an error message in the input', () => {
    const user = {
      name: 'Elizabeth Olsen',
      email: 'liza.yahoo.com',
      password: 'pwd123',
    }

    it('should be alert message if the email is incorrect', () => {
      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.alert.haveText('Informe um email válido')
    });
  })

  context('when the password does not have the required number of characters', () => {
    const passwords = ['1', '2a', '3ab', '4abc', '5abcd']

    beforeEach(() => {
      signupPage.go()
    })

    passwords.forEach((password) => {
      it(`the user must not register with password: ${password}`, () => {
        const user = {
          name: 'Jason Friday',
          email: 'jason@gmail.com',
          password: password,
        }

        signupPage.form(user)
        signupPage.submit()
      });
    })

    afterEach(() => {
      signupPage.alert.haveText('Pelo menos 6 caracteres')
    })
  })

  context('when no form field and filled', () => {
    const alertMessages = [
      'Nome é obrigatório',
      'E-mail é obrigatório',
      'Senha é obrigatória',
    ]

    before(() => {
      signupPage.go()
      signupPage.submit()
    })

    alertMessages.forEach((message) => {
      it(`must display ${message.toLowerCase()}`, () => {
        signupPage.alert.haveText(message)
      });
    })
  })
})