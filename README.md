# Project description
This is a demo testing project for https://buggy.justtestit.org.

It includes exploratory testing and automation testing.

For the outcome of exploratory testing, please refer to the [Bug Report](https://github.com/hunternz/buggy-fun/blob/main/BugReport.md)

For automation testing, it uses Cypress + Javascript as the solution. For how to run the tests and review the test report please refer to the details below.

# Cypress Solution

## Prerequisites
* **node.js:** go to https://nodejs.org/en/download/ and install the latest LTS version
* **git:** go to https://git-scm.com/downloads/ and install the latest version
## Git clone this repo to local directory
```
cd /yourusername/projects
git clone https://github.com/hunternz/buggy-fun.git
```
## Install Cypress and other dependencies on local machine
```
cd /yourusername/projects/buggy-fun
npm install
```
## Verify installed Cypress
```
npx cypress version
npx cypress verify
```
## Run Cypress tests and check result
### About the tests
* There are 14 test cases that cover 5 major functions which are
  - Login
  - Logout
  - Register user
  - Update user profile
  - Vote
 * There is 1 test case for Logout should always fail since it's catching a bug
### Run with Cypress Test Runner
#### Open Cypress Test Runner
```
npx cypress open
```
#### In the Cypress Test Runner, select Chrome as the browser then click "Run 5 integration specs" to launch a Chrome window to run all the tests
![alt text](https://github.com/hunternz/buggy-fun/blob/main/src/images/CypressTestRunner.png "Cypress Test Runner")

#### Check test result when all tests complete running
![alt text](https://github.com/hunternz/buggy-fun/blob/main/src/images/CypressTestRunnerResult.png "Cypress Test Runner Result")
### Run with command line
#### Run all tests and generate html report
```
npm run test-and-report
```
* Please ignore the `npm ERR` if there is any
* The html report is generated in the folder `/yourusername/projects/buggy-fun/cypress/reports/html`, open the `index.html` file in any browser to check the test result
* There is a sample report could be found in the folder `/yourusername/projects/buggy-fun/cypress/SampleReports/html`
* It has to do a cleanup each time before running `npm run test-and-report`, just delete the `results` and `reports` folders and empty the recycle/trash bin

![alt text](https://github.com/hunternz/buggy-fun/blob/main/src/images/SampleHTMLReport.png "Sample HTML Report")
