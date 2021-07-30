async function main() {
    // Initialize dependency as variable
    const dotenv = require('dotenv');

    // Import required files
    const requester = require('./Requester/requester.js');
    const inputter = require('./Inputter/inputter.js');
    const printer = require('./Printer/printer.js');
    const consoleOutput = new printer();

    // Uses token for authorization
    dotenv.config({ path: '.env' });
    const TOKEN = process.env.ZENDESK_OAUTH_TOKEN;
    const ticketRequest = new requester(TOKEN,consoleOutput);
    const consoleInput = new inputter(ticketRequest, consoleOutput);

    // Initialize variables that will be used within the loop
    let answer;
    let inputIsExit;

    // Introduces the ticket viewer to user
    consoleOutput.intro();

    // Loops until user inputs 'exit'
    do {
        answer = consoleInput.askQuestion(consoleOutput.initQuestion());
        inputIsExit = await consoleInput.inputOptions(answer);
    } while(inputIsExit == false);
}

main();