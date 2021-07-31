const readlineSync = require('readline-sync');

class inputter {
    /*
     *  This class responds to user inputs
     *  @param requester class to be used to respond to user inputs, and printer class
     */
    constructor(TicketRequest, ConsoleOutput) {
        this.ticketRequest = TicketRequest;
        this.consoleOutput = ConsoleOutput;
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
        let inputIsExit = false, inputIsStop = false, inPageMenu = false;
        let idTicket;
        let url;

        switch(answer) {
            case 'menu':
                this.consoleOutput.menu();
                break;
            case '1':
                url = 'https://zccjef223.zendesk.com/api/v2/tickets.json?page[size]=25';
                this.pages = await this.ticketRequest.requestAllTickets(url);
                do {
                    answer = this.askQuestion(this.consoleOutput.allTicketsQuestions());
                    inputIsStop = await this.paginationInputOptions(answer);
                } while(inputIsStop == false);
                break;
            case '2':
                url = 'https://zccjef223.zendesk.com/api/v2/tickets/';
                idTicket = this.askQuestion(this.consoleOutput.idQuestion());
                await this.ticketRequest.requestOneTicket(url, idTicket);
                break;
            case 'exit':
                inputIsExit = true;
                this.consoleOutput.goodbye();
                break;             
            default:
                this.consoleOutput.sorry(inPageMenu);
        }
        return inputIsExit;
    }

    /*
     *  Responds to all-tickets menu options
     *  @param user's inputted choice from the menu
     *  @return true/false if the user typed 'stop'
     */
    async paginationInputOptions(answer) {
        let inputIsStop = false, inPageMenu = true;

        switch(answer) {
            case 'prev':
                if(this.pages[0].tickets.length == 0) this.consoleOutput.pageDoesNotExist();
                // Else, send previous page's url to fetch again
                else this.pages = await this.ticketRequest.requestAllTickets(this.pages[1].links.prev);
                break;
            case 'next':
                if(this.pages[2].tickets.length == 0) this.consoleOutput.pageDoesNotExist();
                // Else, send next page's url to fetch again
                else this.pages = await this.ticketRequest.requestAllTickets(this.pages[1].links.next);
                break;
            case 'stop':
                this.consoleOutput.leavePaginationMenu();
                inputIsStop = true;
                break;
            default:
                this.consoleOutput.sorry(inPageMenu);
        }
        return inputIsStop;
    }
}

module.exports = inputter;