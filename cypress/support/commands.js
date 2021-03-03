import testdata from "../fixtures/testdata.json"

Cypress.Commands.add("inputUsername", (username) => {
  cy.get('.input-sm').clear().type(username)
})

Cypress.Commands.add("inputPassword", (password) => {
  cy.get('input[name="password"]').clear().type(password)
})

Cypress.Commands.add("clickLoginButton", () => {
  cy.get('button[type=submit]').click()
})

Cypress.Commands.add("clickRegisterOnNavbar", () => {
  cy.get('a').contains('Register').click()
})

Cypress.Commands.add("clickLogoutOnNavbar", () => {
  cy.get('a').contains('Logout').click()
})

Cypress.Commands.add("clickProfileOnNavbar", () => {
  cy.get('a').contains('Profile').click()
})

Cypress.Commands.add("clickOverallRatingImage", () => {
  cy.get('img[src="/img/overall.jpg"]').click()
})

Cypress.Commands.add("inputUsernameOnRegisterPage", (username) => {
  cy.get('#username').clear().type(username)
})

Cypress.Commands.add("inputFirstNameOnRegisterPage", (firstname) => {
  cy.get('#firstName').clear().type(firstname)
})

Cypress.Commands.add("inputLastNameOnRegisterPage", (lastname) => {
  cy.get('#lastName').clear().type(lastname)
})

Cypress.Commands.add("inputPasswordOnRegisterPage", (password) => {
  cy.get('#password').clear().type(password)
})

Cypress.Commands.add("inputConfirmPasswordOnRegisterPage", (confirmpassword) => {
  cy.get('#confirmPassword').clear().type(confirmpassword)
})

Cypress.Commands.add("clickCancelOnRegisterPage", () => {
  cy.get('a').contains('Cancel').click()
})

Cypress.Commands.add("clickRegisterOnRegisterPage", () => {
  cy.get('.btn-default').click()
})

Cypress.Commands.add("inputLastNameOnProfilePage", (lastname) => {
  cy.get('#lastName').clear().type(lastname)
})

Cypress.Commands.add("clickSaveButtonOnProfilePage", () => {
  cy.get('button[type=submit]').click()
})

Cypress.Commands.add("inputCurrentPasswordOnProfilePage", (currentpassword) => {
  cy.get('#currentPassword').clear().type(currentpassword)
})

Cypress.Commands.add("inputNewPasswordOnProfilePage", (newpassword) => {
  cy.get('#newPassword').clear().type(newpassword)
})

Cypress.Commands.add("inputNewPasswordConfirmationOnProfilePage", (newpassword) => {
  cy.get('#newPasswordConfirmation').clear().type(newpassword)
})

Cypress.Commands.add("inputComment", (comment) => {
  cy.get('#comment').clear().type(comment)
})

Cypress.Commands.add("clickVoteButton", () => {
  cy.get('.btn-success').click()
})

Cypress.Commands.add("generateRandomString", (length) => {
  let randomString = ""
  let availableCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"

  for(let i = 0; i < length; i++) {
    randomString += availableCharacters.charAt(Math.floor(Math.random() * availableCharacters.length))
  }
  return randomString
})

Cypress.Commands.add("signInWithAPI", (username, password) => {
  cy.request({
    method: 'POST',
    url: testdata.oauth_endpoint,
    form: true, //sets to application/x-www-form-urlencoded
    body: {
      grant_type: 'password',
      username: username,
      password: password
    }
  })
  .its('body')
  .then(identity => {
    window.localStorage.setItem('token', identity.access_token)
  });
})

//register a new user and then sign in
Cypress.Commands.add("registerThenSignInWithAPI", (username, firstname, lastname, password) => {
  cy.request({
    method: 'POST',
    url: testdata.user_endpoint,
    headers: {
      'content-type': 'application/json' 
    },
    body: {
      'content-type': 'raw',
      username: username,
      password: password,
      firstName: firstname,
      lastName: lastname,
      confirmPassword: password
    }
  }).as('register')

  cy.get('@register').should((response) => {
    expect(response.status).to.eq(201)
  })
  
  cy.signInWithAPI(username, password)
})

//Under development
Cypress.Commands.add("resetTestUser", (username, password) => {
  cy.signInWithAPI(username, password)
  cy.request({
    method: 'PUT',
    url: testdata.profile_endpoint,
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('token')
    },
    body: {
      'content-type': 'raw',
      username: testdata.username,
      firstName: testdata.firstname,
      lastName: testdata.lastname,
      address: testdata.address,
      age: testdata.age,
      gender: testdata.gender,
      hobby: testdata.hobby,
      phone: testdata.phone,
      newPassword: testdata.password,
      newPasswordConfirmation: testdata.password,
      password: testdata.password
    }
  })
})