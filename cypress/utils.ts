export const longWait = () => {
    cy.wait(1000)
}

export const login = () => {
    cy.visit('/admin')
    cy.get('input[id="email"]').type(Cypress.env('ADMIN_EMAIL'))
    cy.get('input[id="password"]').type(Cypress.env('ADMIN_PASSWORD'))
    cy.get('form').submit()
}

export const logout = () => {
    cy.contains('Log out').click()
}
