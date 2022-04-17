import forgotPasswordPage from '../support/pages/forgotPassword'
import resetPasswordPage from '../support/pages/resetPassword'

describe('password recovery', function() {
  before(function() {
    cy.fixture('recovery').then(function(recovery) {
      this.data = recovery
    })
  })

  context('when user forgot password', function() {
    before(function() {
      cy.postUser(this.data)
    })

    it('must be able to recovery by email', function() {
      forgotPasswordPage.go()
      forgotPasswordPage.form(this.data.email)
      forgotPasswordPage.submit()

      const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'
      forgotPasswordPage.toast.shouldHaveText(message)
    });
  })

  context('when user requests redemption', function() {
    before(function() {
      cy.postUser(this.data)
      cy.recoveryPassword(this.data.email)
    })

    it('must be register a new password', function() {
      const token = Cypress.env('recoveryToken')
      resetPasswordPage.go(token)
      resetPasswordPage.form('abc123', 'abc123')
      resetPasswordPage.submit()

      const message = 'Agora você já pode logar com a sua nova senha secreta.'
      resetPasswordPage.toast.shouldHaveText(message)
    });
  })
})