const readlineSync = require('readline-sync');

class inputter {
    constructor(TicketRequest) {
        this.ticketRequest = TicketRequest;
        this.pages = new Array(3);  // Will be an array that includes the previous, current, and next page
    }

    askQuestion(strQuestion) {
        return readlineSync.question(strQuestion);
    }

    /*getIDInput() {
        return readlineSync.question('Type in an ID: ');
    }*/

    async inputOptions(answer) {
        let inputIsExit = false, inputIsStop = false;
        switch(answer) {
            case 'menu':
                console.log('Type \'1\' to view all tickets');
                console.log('Type \'2\' to view one tickets (but you\'ll need to know an ID)');
                console.log('Type \'exit\' to quit');
                break;
            case '1':
                let url = 'https://zccjef223.zendesk.com/api/v2/tickets.json?page[size]=25';
                this.pages = await this.ticketRequest.requestAllTickets(url);
                do {
                    console.log('(hehehe prepare to face my pun-believable puns!!!)');
                    answer = this.askQuestion('Check out the \'prev\' page, \'next\' page, or \'stop\' looking at all the tickets: ');
                    inputIsStop = await this.paginationInputOptions(answer);
                } while(inputIsStop == false);
                break;
            case '2':
                await this.ticketRequest.requestOneTicket(this.askQuestion('Type in an ID: '));
                break;
            case 'exit':
                inputIsExit = true;
                console.log('Bye, have a great day!');
                break;
            default:
                console.log('Sorry, my vocabulary doesn\'t go that far. I skipped high school :/');
        }
        return inputIsExit;
    }

    // Before this, it will loop and ask 'Input \'prev\' to see the previous page or \'next\' for the next page'
    async paginationInputOptions(answer) {
        let inputIsStop = false;
        switch(answer) {
            case 'prev':
                if(this.pages[0].tickets.length == 0) console.log("Sorry, this page doesn't exist :/");
                else {  // Prints previous page, then sends previous page's url to fetch again
                    //console.log(this.pages[0]);
                    this.pages = await this.ticketRequest.requestAllTickets(this.pages[1].links.prev);
                }
                break;
            case 'next':
                if(this.pages[2].tickets.length == 0) console.log("Sorry, this page doesn't exist :/");
                else {  // Prints next page, then sends next page's url to fetch again
                    //console.log(this.pages[2]);
                    this.pages = await this.ticketRequest.requestAllTickets(this.pages[1].links.next);
                }
                break;
            case 'stop':
                inputIsStop = true;
                console.log('Now leaving the all-tickets menu...');
                break;
            default:
                console.log('Sorry, my vocabulary doesn\'t go that far. I skipped high school :/');
        }
        return inputIsStop;
    }
}

module.exports = inputter;