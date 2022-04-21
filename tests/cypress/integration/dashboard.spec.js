import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dashboard'

describe('dashboard', function() {
  context('when the user makes an appointment in the mobile app', () => {
    const data = {
      customer: {
        name: 'Nikk Sixx',
        email: 'sixx@motleycrue.com',
        password: 'pwd123',
        is_provider: false,
      },
      provider: {
        name: 'Ramon Valdes',
        email: 'ramos@televisa.com',
        password: 'pwd123',
        is_provider: true,
      },
      appointmentHour: '14:00'
    }

    before(function() {
      cy.postUser(data.provider)
      cy.postUser(data.customer)

      cy.apiLogin(data.customer)

      cy.setProviderId(data.provider.email)
      cy.createAppointment(data.appointmentHour)
    })

    it('appointment should be displayed on the dashboard', function() {
      loginPage.go()
      loginPage.form(data.provider)
      loginPage.submit()
      
      dashPage.calendarShouldBeVisible()

      const day = Cypress.env('appointmentDay')
      dashPage.selectDay(day)

      dashPage.appointmentShouldBeVisible(data.customer, data.appointmentHour)
    });
  });
})