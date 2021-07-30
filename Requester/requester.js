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
    async requestOneTicket(urlFirstPart, ticket_id) {
        await fetch(urlFirstPart + ticket_id + '.json', { headers: this.authHeader })
        .then(this.errorCheck)  // References errorCheck with the fetch response instead of calling the function
        .then(response => response.json())
        .then(data => this.consoleOutput.ticketPrinter(data.ticket.id, data.ticket.subject, data.ticket.description))
        .catch(err => console.error(err));
    }

    /*
     *  Gets all the tickets and pages through 25 tickets
     *  @param url that returns the first 25 tickets
     *  @return array that includes the previous, current, and next page, respectively
     */
    async requestAllTickets(url) {
        let prevLink, nextLink;
        let pages;

        await fetch(url, { headers: this.authHeader })
        .then(this.errorCheck)
        .then(response => response.json())
        .then(async(data) => {
            prevLink = data.links.prev;
            nextLink = data.links.next;
            pages = await this.linkCheck(prevLink, nextLink);
            pages[1] = data;    // After 'pages' is initialized with prev & next pages, the 2nd index will hold current page data
            data.tickets.map(ticket => this.consoleOutput.ticketPrinter(ticket.id, ticket.subject, ticket.description));
        })
        .catch(err => console.error(err));

        return pages;
    }

    /*
     *  Loads the previous and next page to be checked if they exist and if they can be used in the menu
     *  @param links to the previous and next page
     *  @return array that includes the previous page and next page data
     */
    async linkCheck(prevLink, nextLink) {
        let urls = [prevLink, nextLink];
        let jsonPages = new Array(3);

        await Promise.all(urls.map(
            url => fetch(url, { headers: this.authHeader })
        .then(this.errorCheck)))
        .then(async(responses) => await Promise.all(
            responses.map(response => response.json())
        ))
        .then(jsons => {
            jsonPages[0] = jsons[0];    // Stores previous page data into 1st index
            jsonPages[2] = jsons[1];    // Stores next page data into 3rd index
        })
        .catch(err => console.error(err));

        return jsonPages;
    }

    /*
     *  Checks for fetch errors
     *  @param fetch response
     *  @return fetch response
     */
    errorCheck(response) {
        console.log('\x1b[1m\x1b[31m');     // Sets the color format for errors
        if(!response.ok) {
            switch(response.status) {
                case 400:
                    throw 'Bud, that\'s an \'Error ' + response.status + '\'. I don\'t accept these kinds of ticket IDs. SECURITY!';
                case 401:
                    throw 'Wait, that\'s an \'Error ' + response.status + '\'...you\'re not authorized to be here! SECURITY!';
                case 404:
                    throw 'Oof, sorry, that\'s an \'Error ' + response.status + '\'. Your ticket is not real, like my existence...';
                default:
                    throw 'Woah, I just caught an error, but I\'m not exactly sure what caused it...What did you do?';
            }
        }
        else return response;
    }
}

module.exports = requester;