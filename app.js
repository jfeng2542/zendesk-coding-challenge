async function main() {
    // Initialize dependency as variable
    const dotenv = require('dotenv');

    // Import required files
    const requester = require('./Requester/requester.js');
    const inputter = require('./Inputter/inputter.js');

    // Uses token for authorization
    dotenv.config({ path: '.env' });
    const TOKEN = process.env.ZENDESK_OAUTH_TOKEN;
    const ticketRequest = new requester(TOKEN);
    const consoleInput = new inputter(ticketRequest);

    // Initialize variables that will be used within the loop
    let answer, inputIsExit;

    console.log('Hi! My name is Sam, the Ticket Viewer :D');

    // Loops until user inputs 'exit'
    do {
        answer = consoleInput.askQuestion('Command me by typing \'menu\' to see your choices, or \'exit\' to quit: ');
        //console.log('');
        inputIsExit = await consoleInput.inputOptions(answer);
        //console.log('\n');
    } while(inputIsExit == false);
}

main();