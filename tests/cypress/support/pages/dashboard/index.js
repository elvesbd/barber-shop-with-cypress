import { el } from './elements'
import header from '../../components/header'

class DashboardPage {
  constructor() {
    this.header = header
  }

  calendarShouldBeVisible() {
    cy.get('.DayPicker', { timeout: 7000 }).should('be.visible')
  }
}

export default new DashboardPage();