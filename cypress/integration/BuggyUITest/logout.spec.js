/// <reference types="cypress" />

import testdata from "../../fixtures/testdata.json"

context('Logout Test', () => {        
    beforeEach(() => { 
      cy.signInWithAPI(testdata.username, testdata.password)
      cy.visit('/')
      cy.url().should('eq', 'https://buggy.justtestit.org/')
      cy.contains('Hi, ' + testdata.firstname).should('be.visible')
      cy.contains('Buggy Software').should("be.visible")
    })
  
    it('Logout on home page', function () {   
      cy.clickLogoutOnNavbar()
      cy.get('a').contains('Register').should('be.visible')
    })
  
    it('Logout on profile page', function () {
      cy.clickProfileOnNavbar()
      cy.url().should('eq', 'https://buggy.justtestit.org/profile')
      cy.clickLogoutOnNavbar()
      cy.get('a').contains('Register').should('be.visible')
    })
    
    it('Logout on car details page', function () {
      cy.visit(testdata.diablo_url)
      cy.contains('Thank you for your vote!').should('be.visible')
      cy.clickLogoutOnNavbar()
      cy.get('a').contains('Register').should('be.visible')
      cy.contains('You need to be logged in to vote.').should('be.visible')
    })

    it('Logout on overall rating page - FAILED by bug', function () {
      cy.clickOverallRatingImage()
      cy.url().should('eq', 'https://buggy.justtestit.org/overall')
      cy.clickLogoutOnNavbar()
      cy.get('a').contains('Register').should('be.visible')
    })
  
  })