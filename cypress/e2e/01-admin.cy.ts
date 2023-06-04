/// <reference types="cypress" />

import { login, logout, longWait } from '../utils'

describe('Admin functionality', () => {
    beforeEach(() => {
        cy.visit('/admin')

        longWait()
        cy.get('body').then($body => {
            if ($body.text().includes('Log out')) {
                logout()
            }
        })
    })

    it('opens the admin page', () => {})

    it('errors when no credentials are provided', () => {
        cy.get('form').submit()
        cy.contains('Please fill all fields')
    })

    it('prevents login with incorrect credentials', () => {
        cy.get('input[id="email"]').type('wrong')
        cy.get('input[id="password"]').type('wrong')
        cy.get('form').submit()
        cy.contains('auth/invalid-email')
    })

    it('allows login with correct credentials', () => {
        login()
        cy.contains('You are logged in')
    })

    it('logs in and out', () => {
        login()
        cy.contains('You are logged in')

        longWait()

        logout()
        cy.contains('Logged out')
    })

    it('will throw an error if an image isnt attached', () => {
        login()

        cy.contains('Upload Photo').click()

        cy.get('input[id="title"]').type('Test Photo')
        cy.get('select[id="type"]').select('oils')

        cy.contains(/Submit/).click()

        cy.contains('Please fill out all fields')
    })

    it('will fill out form and upload photo', () => {
        login()

        cy.contains('Upload Photo').click()

        cy.intercept('POST', /image\/upload/).as('uploadPhoto')

        cy.get('input[id="title"]').type('Test Photo')
        cy.get('select[id="type"]').select('oils')
        cy.get('input[id="imageUploadInput"]').selectFile('cypress/fixtures/image-upload.jpg', { force: true })

        cy.wait('@uploadPhoto').then(interception => {
            if (interception.response) {
                expect(interception.response.statusCode).to.equal(200)
            }
        })

        longWait()

        cy.contains(/Submit/).click()

        cy.contains('Image Submitted Successfully')
        longWait()
        cy.contains('Test Photo')
    })

    it('will change the photo to Egg Tempera', () => {
        login()

        // Change the photo to Egg Tempera
        cy.get('[data-test="edit-image-button"]').eq(0).click()
        longWait()
        cy.get('select[id="type"]').select('eggTempera')
        cy.contains(/Submit/).click()
        longWait()

        // Check that the photo is now in Egg Tempera
        cy.contains('Test Photo').should('not.exist')
        cy.get('[data-test="type-selector"]').select('Egg Tempera')
        cy.contains('Test Photo')
    })

    it('will delete the photo', () => {
        login()

        cy.get('[data-test="type-selector"]').select('Egg Tempera')
        cy.get('[data-test="delete-image-button"]').click({ multiple: true })

        cy.contains('Test Photo').should('not.exist')
    })
})
