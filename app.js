async function main() {
    // Initialize dependencies as variables
    const readlineSync = require('readline-sync');
    const path = require('path');
    const dotenv = require('dotenv');

    const requester = require('./Requester/requester.js');

    // Uses token for authorization
    dotenv.config({ path: '.env' });
    const TOKEN = process.env.ZENDESK_OAUTH_TOKEN;
    const TicketRequest = new requester(TOKEN);

    let answer;
    console.log('Hi! My name is Sam, the Ticket Viewer :D');

    // Loops until exit
    do {
        answer = readlineSync.question('Command me by typing \'menu\' to see your choices, or \'exit\' to quit: ');
        console.log('');
        switch(answer) {
            case 'menu':
                console.log('Type \'1\' to view all tickets');
                console.log('Type \'2\' to view one tickets (but you\'ll need to know an ID)');
                console.log('Type \'exit\' to quit');
                break;
            case '1':
                await TicketRequest.requestAllTickets(readlineSync);
                break;
            case '2':
                await TicketRequest.requestOneTicket(getRequestInput(readlineSync));
                break;
            case 'exit':
                console.log('Bye, have a great day!');
                break;
            default:
                console.log('Sorry, my vocabulary doesn\'t go that far. I skipped high school :/');
        }
        console.log('\n');
    } while(answer.localeCompare('exit') != 0);
}

function getRequestInput(readlineSync) {
    return readlineSync.question('Type in an ID: ');
}

main();