const readlineSync = require('readline-sync');

class inputter {
    /*
     *  This class responds to user inputs
     *  @param requester class to be used to respond to user inputs
     */
    constructor(TicketRequest) {
        this.ticketRequest = TicketRequest;
        this.pages = new Array(3);  // Will be an array that includes the previous, current, and next page
    }

    /*
     *  Uses readlineSync to prompt for user input
     *  @param question to ask the user
     *  @return user's answer to the question
     */
    askQuestion(strQuestion) {
        return readlineSync.question(strQuestion);
    }

    /*
     *  Responds to initial menu options
     *  @param user's inputted choice from the menu
     *  @return true/false if the user typed 'exit'
     */
    async inputOptions(answer) {
        let inputIsExit = false, inputIsStop = false;

        switch(answer) {
            case 'menu':
                console.log('Type \'1\' to view all tickets');
                console.log('Type \'2\' to view one tickets (but you\'ll need to know an ID)');
                console.log('Type \'exit\' to quit');
                break;
            case '1':
                this.pages = await this.ticketRequest.requestAllTickets();
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

    /*
     *  Responds to all-tickets menu options
     *  @param user's inputted choice from the menu
     *  @return true/false if the user typed 'stop'
     */
    async paginationInputOptions(answer) {
        let inputIsStop = false;

        switch(answer) {
            case 'prev':
                if(this.pages[0].tickets.length == 0) console.log("Sorry, this page doesn't exist :/");
                // Else, send previous page's url to fetch again
                else this.pages = await this.ticketRequest.requestAllTickets(this.pages[1].links.prev);
                break;
            case 'next':
                if(this.pages[2].tickets.length == 0) console.log("Sorry, this page doesn't exist :/");
                // Else, send next page's url to fetch again
                else this.pages = await this.ticketRequest.requestAllTickets(this.pages[1].links.next);
                break;
            case 'stop':
                console.log('Now leaving the all-tickets menu...');
                inputIsStop = true;
                break;
            default:
                console.log('Sorry, I do\'t know what you just said. I also forgot words I used to know some time ago...');
                console.log('...I need to go back to school...');
        }
        return inputIsStop;
    }
}

module.exports = inputter;