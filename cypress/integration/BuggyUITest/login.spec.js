/// <reference types="cypress" />

import testdata from "../../fixtures/testdata.json"

context('Login Test', () => {
  beforeEach(() => { 
    cy.visit('/')
    cy.url().should('eq', 'https://buggy.justtestit.org/')
    cy.contains('Buggy Software').should("be.visible")
  })

  it('Cannot login with invalid credentials', function () {   
    cy.inputUsername('invalid_username')
    cy.inputPassword('wrong_password')
    cy.intercept(testdata.oauth_endpoint).as('oauth')
    cy.clickLoginButton()
    cy.wait('@oauth').its('response.body').should('contains', 'Invalid credentials')
    cy.contains('Invalid username/password').should("be.visible")
  })

  it('Should be able to login with valid credentials', function () {
    cy.inputUsername(testdata.username)
    cy.inputPassword(testdata.password)
    cy.intercept(testdata.oauth_endpoint).as('oauth')
    cy.clickLoginButton()
    cy.wait('@oauth')
      .its('response')
      .should('deep.include', {
        statusCode: 200
      })
    cy.contains('Hi, ' + testdata.firstname).should("be.visible")
    cy.contains('Profile').should("be.visible")
    cy.contains('Logout').should("be.visible")
  })

})