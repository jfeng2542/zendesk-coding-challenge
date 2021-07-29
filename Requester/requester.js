const fetch = require('node-fetch');

class requester {
    constructor(token) {
        this.TOKEN = token;
    }

    async requestOneTicket(ticket_id) {
        await fetch('https://zccjef223.zendesk.com/api/v2/tickets/' + ticket_id + '.json', {
            headers: { 'Authorization': 'Bearer ' + this.TOKEN }
        })
        .then(this.errorCheck)  // References errorCheck with a fetch response instead of calling the function
        .then(response => response.json())
        .then(data => console.log('Ticket with subject \'' + data.ticket.subject + '\''))
        .catch(err => console.error(err));
    }

    async requestAllTickets(readlineSync) {
        let url = 'https://zccjef223.zendesk.com/api/v2/tickets.json?page[size]=25';
        let prevLink, nextLink;
        //do {
            await fetch(url, {
                headers: { 'Authorization': 'Bearer ' + this.TOKEN }
            })
            .then(this.errorCheck)
            .then(response => response.json())
            .then(async(data) => {
                prevLink = data.links.prev;
                nextLink = data.links.next;
                await this.linkCheck(prevLink, nextLink);
            })
            .catch(err => console.error(err));
        //} while(check for null);
    }

    // Checks for valid pagination
    async linkCheck(prevLink, nextLink) {
        let urls = [prevLink, nextLink];
        await Promise.all(urls.map(url => fetch(url, {
            headers: { 'Authorization': 'Bearer ' + this.TOKEN }
        })))
        // .then(map to this.errorCheck)
        .then(async(responses) => await Promise.all(
            responses.map(response => response.json())
        ))
        .then(jsons => {
            paginationMsg(jsons[0].links.prev, jsons[1].links.next);
        })
        .catch(err => console.error(err));
    }

    paginationMsg(prevPage, nextPage) {
        let prevPageExists = true, nextPageExists = true;
        if(prevPage == null) {
            prevPageExists = false;
            console.log('Type \'next\' to view the next page');
        } else if(nextPage == null) {
            nextPageExists = false;
            console.log('Type \'prev\' to view the previous page');
        } else {
            console.log('Type \'prev\' to view the previous page');
            console.log('Type \'next\' to view the next page');
        }
        //FIXME: Implement prev/next input system
    }

    errorCheck(response) {
        if(!response.ok) console.log('Error...');
        else return response;
        /*
        401 - Authentication error
        404 - Ticket ID doesn't exist
        */
    }
}

module.exports = requester;