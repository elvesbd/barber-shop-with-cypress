import dashPage from '../support/pages/dashboard'
import { customer, provider, appointment } from '../support/factories/dashboard'

describe('dashboard', function() {
  context('when the user makes an appointment in the mobile app', () => {
    before(function() {
      cy.postUser(provider)
      cy.postUser(customer)

      cy.apiLogin(customer)
      cy.setProviderId(provider.email)
      cy.createAppointment(appointment.hour)
    })

    it('appointment should be displayed on the dashboard', function() {
      const date = Cypress.env('appointmentDate')
      
      // cy.uiLogin(provider)
      cy.apiLogin(provider, true)
      
      dashPage.calendarShouldBeVisible()
      dashPage.selectDay(date)
      dashPage.appointmentShouldBeVisible(customer, appointment.hour)
    });
  });
})