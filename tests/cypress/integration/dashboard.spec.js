import moment from 'moment'
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

Cypress.Commands.add('createAppointment', function(hour) {
  let now = new Date()
  now.setDate(now.getDate() + 1)

  Cypress.env('appointmentDay', now.getDate())

  const date = moment(now).format(`YYYY-MM-DD ${hour}:00`)
  
  const payload = {
    provider_id: Cypress.env('providerId'),
    date: date
  }

  cy.request({
    method: 'POST',
    url: 'http://localhost:3333/appointments',
    body: payload,
     headers: {
      'authorization': `Bearer ${Cypress.env('apiToken')}` 
    }
  }).then(function(response) {
    expect(response.status).to.eq(200)
    Cypress.env('apiToken', response.body.token)
  })
})

Cypress.Commands.add('setProviderId', function(providerEmail) {
  cy.request({
    method: 'GET',
    url: 'http://localhost:3333/providers',
    headers: {
      'authorization': `Bearer ${Cypress.env('apiToken')}` 
    }
  }).then(function(response) {
    expect(response.status).to.eq(200)
    const providerList = response.body

    providerList.forEach(function(provider) {
      if (provider.email === providerEmail) {
        Cypress.env('providerId', provider.id)
      }
    })
  })
})

Cypress.Commands.add('apiLogin', function(user) {
  const payload = {
    email: user.email,
    password: user.password
  }

  cy.request({
    method: 'POST',
    url: 'http://localhost:3333/sessions',
    body: payload,
  }).then(function(response) {
    expect(response.status).to.eq(200)
    Cypress.env('apiToken', response.body.token)
  })
})