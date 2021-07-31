const readlineSync = require('readline-sync');

class inputter {
    /*
     *  This class responds to user inputs
     *  @param requester class to be used to respond to user inputs, and printer class
     */
    constructor(TicketRequest, ConsoleOutput) {
        this.ticketRequest = TicketRequest;
        this.consoleOutput = ConsoleOutput;
        this.page;      // Will represent all the tickets on a current page
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
                this.page = await this.ticketRequest.requestOnePage(url, this.page);    // If success, page initialized w/ url data
                do {
                    answer = this.askQuestion(this.consoleOutput.allTicketsQuestions());
                    inputIsStop = await this.paginationInputOptions(answer);
                } while(inputIsStop == false);
                break;
            case '2':
                idTicket = this.askQuestion(this.consoleOutput.idQuestion());           // Add ID to url before ticket request
                url = 'https://zccjef223.zendesk.com/api/v2/tickets/' + idTicket + '.json';
                await this.ticketRequest.requestOneTicket(url);
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
                this.page = await this.ticketRequest.requestOnePage(this.page.links.prev, this.page);
                break;
            case 'next':
                this.page = await this.ticketRequest.requestOnePage(this.page.links.next, this.page);
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