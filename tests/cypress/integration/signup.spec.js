import signupPage from '../support/pages/signup'

describe('signup', () => {
  before(() => {
    cy.fixture('signup').then(function(signup) {
      this.success = signup.success
      this.duplicate_email = signup.duplicate_email
      this.invalid_email = signup.invalid_email
      this.short_password = signup.short_password
    })
  })

  context('when the user is new', function() {
    before(function() {
      cy.task('removeUser', this.success.email)
      .then(function(result) {
        console.log(result)
      })
    })

    it('should register a new user with success', function() {
      signupPage.go()
      signupPage.form(this.success)
      signupPage.submit()
      signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
    });
  })

  context('when the email already exists in the base data', function() {
    before(function() {
     cy.postUser(this.duplicate_email)
    })

    it('should not register a new user and display toast with error message', function() {
      signupPage.go()
      signupPage.form(this.duplicate_email)
      signupPage.submit()
      signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
    });
  })

  context('when show an error message in the input', function() {
    it('should be alert message if the email is incorrect', function() {
      signupPage.go()
      signupPage.form(this.invalid_email)
      signupPage.submit()
      signupPage.alert.haveText('Informe um email válido')
    });
  })

  context('when the password does not have the required number of characters', function() {
    const passwords = ['1', '2a', '3ab', '4abc', '5abcd']

    beforeEach(function() {
      signupPage.go()
    })

    passwords.forEach((password) => {
      it(`the user must not register with password: ${password}`, function() {
        this.short_password.password = password

        signupPage.form(this.short_password)
        signupPage.submit()
      });
    })

    afterEach(function() {
      signupPage.alert.haveText('Pelo menos 6 caracteres')
    })
  })

  context('when no form field and filled', function() {
    const alertMessages = [
      'Nome é obrigatório',
      'E-mail é obrigatório',
      'Senha é obrigatória',
    ]

    before(function() {
      signupPage.go()
      signupPage.submit()
    })

    alertMessages.forEach((message) => {
      it(`must display ${message.toLowerCase()}`, function() {
        signupPage.alert.haveText(message)
      });
    })
  })
})