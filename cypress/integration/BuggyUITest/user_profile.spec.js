/// <reference types="cypress" />

import testdata from "../../fixtures/testdata.json"

context('User Profile Test', () => {
  beforeEach(() => { 
    cy.signInWithAPI(testdata.username, testdata.password)
    cy.visit('/')
    cy.url().should('eq', 'https://buggy.justtestit.org/')
    cy.contains('Hi, ' + testdata.firstname).should('be.visible')
    cy.contains('Buggy Software').should("be.visible")
    cy.clickProfileOnNavbar()
    cy.url().should('eq', 'https://buggy.justtestit.org/profile')
  })

  it('Should be able to update user info without changing password', function () {
    cy.inputLastNameOnProfilePage('random last name')
    cy.intercept(testdata.profile_endpoint).as('profile')
    cy.clickSaveButtonOnProfilePage()
    cy.wait('@profile')
    .its('response')
    .should('deep.include', {
      statusCode: 200,
    })
    cy.contains('The profile has been saved successful').should('be.visible')
    cy.inputLastNameOnProfilePage(testdata.lastname)
    cy.clickSaveButtonOnProfilePage()
    cy.contains('The profile has been saved successful').should('be.visible')
  })

  it('Cannot update password if the current password is incorrect', function () {   
    cy.contains('Change Password').should('be.visible')
    cy.inputCurrentPasswordOnProfilePage('wrongpassword')
    cy.inputNewPasswordOnProfilePage('newpassword')
    cy.inputNewPasswordConfirmationOnProfilePage('newpassword')
    cy.clickSaveButtonOnProfilePage()
    cy.contains('Incorrect username or password').should('be.visible')
  })

})