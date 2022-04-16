class Header {
  userLoggedIn(username) {
    cy.get('header a strong', { timeout: 7000 })
    .should('be.visible')
    .should('have.text', username)
  }
}

export default new Header()