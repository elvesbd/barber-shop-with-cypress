describe('dashboard', function() {
  context('when the user makes an appointment in the mobile app', () => {
    const data = {
      customer: {
        name: 'Nikk Sixx',
        email: 'sixx@motleycrue.com',
        password: 'pwd123',
        is_provider: false,
      },
      samurai: {
        name: 'Ramon Valdes',
        email: 'ramos@televisa.com',
        password: 'pwd123',
        is_provider: true,
      }
    }

    before(function() {
      cy.postUser(data.customer)
      cy.postUser(data.samurai)

      cy.apiLogin(data.customer)
      cy.log(`Pegamos o token ${Cypress.env('apiToken')}`)
    })

    it('appointment should be displayed on the dashboard', () => {
      console.log(data)
    });
  });
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