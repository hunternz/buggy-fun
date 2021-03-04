# Exploratory Testing Approach & Bug Report
## Testing Environment
### Server
* https://buggy.justtestit.org
* http://buggy.justtestit.org
### OS & Browsers
* MacOS 10.15.7 + Safari 14 + Chrome 88 + Firefox 86 + Microsoft Edge 88
* iOS 14.4 + Safari 14 + Chrome 87
* Android + Chrome (I only have a pretty old Android phone)
### Third Party Tools
* Charles (https://www.charlesproxy.com/): for monitoring the network trafics and hacking the API requests & responses 
* Postman (https://www.postman.com/): for verifying APIs
## Testing Approach
### Test Types
* **UI testing:** check layout on different window size
* **Funtionality testing:** play with everything that interactive 
* **Cross platform testing:** test on different devices (Mac, iPad, iPhone, Android phone) with different browsers (Chrome, Safari, Firefox, Edge)
* **Accessibility testing:** can I use only keyboard to navigate through all the input fields, links and buttons?
* **Internationalization testing:** use non-English characters as the username, first/last name, password and comments; add comment on different devices with different timezones
* **Performance testing:** use Cypress script to keep creating new users and adding comment, use Postman to send the same API request multiple times in a short time
* **Usability testing:** find anything that makes me feel uncomfortable (eg. there is no pagination for the comments on the model details page) 
* **Security testing:** use Charles to edit endpoint response to see if I can do anyting bad
### Tricks
* Keep develop tool of the browser and Charles open to monitor the network traffics and console messages/errors

## Bug Report
### Foreword
This website is just like a puzzle game and it makes QAs (especially me) obsessed. I spent a lot of time on investigating the root cause of the bugs and prioritizing the severity, and that's why it took more time than I expected.
### Bug #1
#### Title: On the model page, the Author column will display empty value when the number of comment reaching 100 
#### Description
I found this bug by running a Cypress automation test to add lots of comments, then I compared the response of the models endpoint and found the value of `comments.user` was missing and there was a new array for `comments` created when the amount of comment reaching 100, then I used the Cypress test created 99 comment and manually added 1 more, Boom, the magic nubmer 100 was confirmed.
#### Steps
1. Open the page https://buggy.justtestit.org/model/c0bm09jgagshpkqbsuq0%7Cc0bm09jgagshpkqbsurg
2. Check the Author column in the comment table
#### Expected Result
The Author column should show First Name and Last Name of the users
#### Actual Result
The Author column shows nothing for all the comment
#### Screenshot
![alt text](https://github.com/hunternz/buggy-fun/blob/main/src/images/bug1-1.png "Author missing on model page")

### Bug #2
#### Title: all the model pages are broken in Safari, Firefox on Mac and all the browsers on iOS due to the special character `|` in the url is not percent-encoded
#### Description
The URL of the model page contains `|` as the separator and is not percent-encoded, so when opening the model page in Safari, Firefox on Mac and all the browsers including Chrome on iOS will get stuck at loading the content. It works fine only in Chrome and Edge (same core) since the URL will be automatically encoded.
#### Steps
1. Open https://buggy.justtestit.org in Firefox
2. Click the image of the Lamborghini Diablo below Popular Model
#### Expected Result
The detailed infomation of the Diablo model should be displayed
#### Actual Result
The page content is stuck at loading
#### Screenshot
![alt text](https://github.com/hunternz/buggy-fun/blob/main/src/images/bug2-1.png "Model page stuck in Firefox")
#### Workaround
In the browser address bar, manually replace `|` with `%7C` in the URL and press `Enter`
