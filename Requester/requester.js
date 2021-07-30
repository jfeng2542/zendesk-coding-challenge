const fetch = require('node-fetch');
const fetchHeaders = require('fetch-headers');

class requester {
    /*
     *  This class handles fetch requests and errors
     *  @param authorization token
     */
    constructor(token) {
        this.TOKEN = token;
        this.authHeader = new fetchHeaders();
        this.authHeader.append('Authorization', 'Bearer ' + this.TOKEN);
    }

    /*
     *  Gets a ticket with a specific ID
     *  @param user-requested ticket ID
     */
    async requestOneTicket(ticket_id) {
        let urlFirstPart = 'https://zccjef223.zendesk.com/api/v2/tickets/';

        await fetch(urlFirstPart + ticket_id + '.json', { headers: this.authHeader })
        .then(this.errorCheck)  // References errorCheck with the fetch response instead of calling the function
        .then(response => response.json())
        .then(data => console.log('Ticket with subject \'' + data.ticket.subject + '\''))//FIXME: Need better format
        .catch(err => { throw new Error('Oh no, something bad happened! It\'s not your fault though...I think.') });
    }

    /*
     *  Gets all the tickets and pages through 25 tickets
     *  @param url that returns the first 25 tickets
     *  @return array that includes the previous, current, and next page, respectively
     */
    async requestAllTickets() {
        let url = 'https://zccjef223.zendesk.com/api/v2/tickets.json?page[size]=25';
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
            return console.log(data.tickets.map(ticket => console.log(ticket.id)));
        })
        .catch(err => { throw new Error('Oh no, something bad happened! It\'s not your fault though...I think.') });

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
            responses.map(response => response.json()
        )))
        .then(jsons => {
            jsonPages[0] = jsons[0];    // Stores previous page data into 1st index
            jsonPages[2] = jsons[1];    // Stores next page data into 3rd index
        })
        .catch(err => { throw new Error('Oh no, something bad happened! It\'s not your fault though...I think.') });

        return jsonPages;
    }

    /*
     *  Checks if the fetch response is not an error
     *  @param fetch response
     *  @return fetch response
     */
    errorCheck(response) {
        if(!response.ok) {
            switch(response.status) {
                case '400':
                    throw new Error("Invalid ticket ID");
                case '401':
                    throw new Error("Authentication error");
                case '404':
                    throw new Error("Ticket ID doesn't exist");
            }
        }
        else return response;
    }
}

module.exports = requester;