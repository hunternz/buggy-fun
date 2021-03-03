/// <reference types="cypress" />

import testdata from "../../fixtures/testdata.json"

context('User Profile Test', () => {
  beforeEach(() => {
    let username = Date.now().toString()
    cy.log('The new username is: ' + username)
    cy.registerThenSignInWithAPI(username, 'NewUserFirstName', 'NewUserLastName', 'Test@1234')
    cy.visit('/')
    cy.url().should('eq', 'https://buggy.justtestit.org/')
    cy.contains('NewUserFirstName').should('be.visible')
    cy.contains('Buggy Software').should("be.visible")
  })

  it('Should be able to vote with comment', function () {
    cy.visit(testdata.diablo_url)
    cy.contains('This last Diablo').should('be.visible')
    cy.generateRandomString(20).then(comment => {   //this is a custom command defined in /support/commands.js file
      cy.log('The random comment is ' + comment)
      cy.inputComment(comment)
      cy.intercept(testdata.diablo_vote_endpoint).as('vote')
      cy.clickVoteButton()
      cy.wait('@vote')
      .its('response')
      .should('deep.include', {
        statusCode: 200
      })
      cy.contains('Thank you for your vote!').should('be.visible')
      cy.contains(comment).should('be.visible')
    })

  })

  it('Should be able to vote without comment', function () {   
    cy.visit(testdata.diablo_url)
    cy.contains('This last Diablo').should('be.visible')
    cy.intercept(testdata.diablo_vote_endpoint).as('vote')
    cy.clickVoteButton()
    cy.wait('@vote')
    .its('response')
    .should('deep.include', {
      statusCode: 200
    })
    cy.contains('Thank you for your vote!').should('be.visible')
  })

  it('Cannot vote twice', function () {   
    cy.visit(testdata.diablo_url)
    cy.contains('This last Diablo').should('be.visible')
    cy.intercept(testdata.diablo_vote_endpoint).as('vote')
    cy.clickVoteButton()
    cy.wait('@vote')
    .its('response')
    .should('deep.include', {
      statusCode: 200
    })
    cy.contains('Thank you for your vote!').should('be.visible')
    cy.request({
      method: 'POST',
      url: testdata.diablo_vote_endpoint,
      failOnStatusCode: false, // have to set this to assert the 400 status code
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token')
      },
      body: {
        'content-type': 'raw',
        comment: 'Not Again'
      }
    }).as('secondVote')
    cy.get('@secondVote').should((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).property('message').to.contain('Cannot vote more than once')
    })
  })

})