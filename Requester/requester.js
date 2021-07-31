const fetch = require('node-fetch');
const fetchHeaders = require('fetch-headers');

class requester {
    /*
     *  This class handles fetch requests and errors
     *  @param authorization token and printer class
     */
    constructor(token, ConsoleOutput) {
        this.TOKEN = token;
        this.consoleOutput = ConsoleOutput;
        this.authHeader = new fetchHeaders();
        this.authHeader.append('Authorization', 'Bearer ' + this.TOKEN);
    }

    /*
     *  Gets a ticket with a specific ID
     *  @param user-requested ticket ID
     */
    async requestOneTicket(url) {
        await fetch(url, { headers: this.authHeader })
        .then(this.errorCheck)      // References errorCheck with the fetch response instead of calling the function
        .then(response => response.json())
        .then(data => this.consoleOutput.ticketPrinter(data.ticket.id, data.ticket.subject, data.ticket.description))
        .catch(err => console.error(err));
    }

    /*
     *  Gets all the tickets on one page, in which one page is a max of 25 tickets
     *  @param url that returns a specific set of tickets
     *  @return page that includes all of the current tickets
     */
    async requestOnePage(url, page) {
        await fetch(url, { headers: this.authHeader })
        .then(this.errorCheck)
        .then(response => response.json())
        .then(data => {             // If no tickets on the page, the page doesn't exist
            if(data.tickets.length == 0) this.consoleOutput.pageDoesNotExist();
            else {                  // Else, the page does exist, so give the the new fetched data to current page
                page = data;
                this.consoleOutput.allTicketsPrinter(page.tickets);
            }
        })
        .catch(err => console.error(err));
        return page;                // If requested page didn't exist, return original value of page
    }

    /*
     *  Checks for fetch errors
     *  @param fetch response
     *  @return fetch response
     */
    errorCheck(response) {
        let err = '\x1b[1m\x1b[31m';     // Sets the color format for errors
        if(!response.ok) {
            switch(response.status) {
                case 400:
                    throw err + 'Bud, that\'s an \'Error ' + response.status + '\'. I don\'t accept these kinds of ticket IDs.';
                case 401:
                    throw err + 'Wait, that\'s an \'Error ' + response.status + '\'...you\'re not authorized to be here! SECURITY!';
                case 404:
                    throw err + 'Oof, sorry, that\'s an \'Error ' + response.status + '\'. Your ticket is as real as me. It isn\'t.';
                default:
                    throw err + 'Woah, I just caught an error, but I\'m not exactly sure what caused it...What did you do?';
            }
        }
        else return response;
    }
}

module.exports = requester;