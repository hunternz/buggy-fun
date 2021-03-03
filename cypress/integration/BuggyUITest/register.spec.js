/// <reference types="cypress" />

import testdata from "../../fixtures/testdata.json"

context('Register Test', () => {
    beforeEach(() => { 
      cy.visit('/')
      cy.url().should('eq', 'https://buggy.justtestit.org/')
      cy.contains('Buggy Software').should("be.visible")
    })

    it('Clicking Register button should open register page', function () {   
      cy.clickRegisterOnNavbar()
      cy.url().should('eq', 'https://buggy.justtestit.org/register')
      cy.contains('Register with Buggy Cars Rating').should("be.visible")
      cy.clickCancelOnRegisterPage()
      cy.contains('Popular Model').should("be.visible")
    })

    it('Cannot register with existing username', function () {
      cy.visit('/register')
      cy.url().should('eq', 'https://buggy.justtestit.org/register')
      cy.contains('Register with Buggy Cars Rating').should("be.visible")
      cy.inputUsernameOnRegisterPage(testdata.username)
      cy.inputFirstNameOnRegisterPage(testdata.firstname)
      cy.inputLastNameOnRegisterPage(testdata.lastname)
      cy.inputPasswordOnRegisterPage(testdata.password)
      cy.inputConfirmPasswordOnRegisterPage(testdata.password)
      cy.intercept(testdata.user_endpoint).as('users')
      cy.clickRegisterOnRegisterPage()
      cy.wait('@users')
      .its('response')
      .should('deep.include', {
        statusCode: 400
      })
      cy.contains('UsernameExistsException: User already exists').should("be.visible")
      cy.clickCancelOnRegisterPage()
      cy.contains('Popular Model').should("be.visible")
    })
  
    it('Should be able to register with new username', function () {
      cy.visit('/register')
      cy.url().should('eq', 'https://buggy.justtestit.org/register')
      cy.contains('Register with Buggy Cars Rating').should("be.visible")
      cy.generateRandomString(20).then(newuser => {   //this is a custom command defined in /support/commands.js file
          cy.log('The random username is ' + newuser)
          cy.inputUsernameOnRegisterPage(newuser)
      })
      cy.inputFirstNameOnRegisterPage(testdata.firstname)
      cy.inputLastNameOnRegisterPage(testdata.lastname)
      cy.inputPasswordOnRegisterPage(testdata.password)
      cy.inputConfirmPasswordOnRegisterPage(testdata.password)
      cy.intercept(testdata.user_endpoint).as('users')
      cy.clickRegisterOnRegisterPage()
      cy.wait('@users')
      .its('response')
      .should('deep.include', {
        statusCode: 201
      })
      cy.contains('Registration is successful').should("be.visible")
      cy.clickCancelOnRegisterPage()
      cy.contains('Popular Model').should("be.visible")
    })

  })