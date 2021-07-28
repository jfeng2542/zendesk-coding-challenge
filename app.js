function main() {
    // Initialize dependencies as variables
    const readlineSync = require('readline-sync');
    const path = require('path');
    const dotenv = require('dotenv');

    // Gets token for authorization
    dotenv.config({ path: '.env' });
    const TOKEN = process.env.ZENDESK_API_TOKEN;

    let answer;
    console.log('Hi! My name is Sam, the Ticket Viewer :D');

    // Loops until exit
    do {
        answer = readlineSync.question('Command me by typing \'menu\' to see your choices, or \'exit\' to quit: ');
        switch(answer) {
            case 'menu':
                console.log('Type \'1\' to view one ticket');
                console.log('Type \'2\' to view all the tickets');
                console.log('Type \'exit\' to quit');
                break;
            case '1':
                console.log('Wait, hold on, I don\'t actually know how to do this yet. Sorry, it\'s my first day :/');
                break;
            case '2':
                console.log('Wait, hold on, I don\'t actually know how to do this yet. Sorry, it\'s my first day :/');
                break;
            case 'exit':
                console.log('Bye, have a great day!');
                break;
            default:
                console.log('Sorry, my vocabulary doesn\'t go that far. I skipped high school :/');
        }
    } while(answer.localeCompare('exit') != 0);
}

main();