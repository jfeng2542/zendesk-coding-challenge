# zendesk-coding-challenge
This is a command-line interface program that utilizes Node JS. The program sends HTTP requests to Zendesk API and displays detailed information obtained from the requests.
## Installation Instructions
Required modules:
- NPM Version: 6.14.8 or greater
- NodeJS Version: 14.15.0 or greater
<br /><br />
1. Clone the repository into your local device
```
git clone https://github.com/jfeng2542/zendesk-coding-challenge.git
```
2. Make sure that the .env file is within the same directory that you cloned the project on<br /><br />
3. Open a terminal and run the following command
```
npm install
```
4. Enter the following command to run the program
```
npm start
```

## Unit Testing
*NOTE: Some tests expect user interaction for a specific amount of time. The test will fail if the user interacts with it for too long.*
1. Run the following command to run all unit tests
```
npm test
```
2. To run specific files (```inputter.test.js``` or ```requester.test.js```), append the file name to the command. For example:
```
npm test requester.test.js
```