import { el } from "./elements"
import toast from '../../components/toast'

class ResetPasswordPage {
  constructor() {
    this.toast = toast
  }

  go(token) {
    cy.visit(`/reset-password?token=${token}`)
  }

  form(newPassword, confirmPassword) {
    cy.get(el.password)
      .clear()
        .type(newPassword)
    cy.get(el.confirmPassword)
      .clear()
        .type(confirmPassword)
  }

  submit() {
    cy.contains(el.changePassButton).click()
  }
}

export default new ResetPasswordPage()