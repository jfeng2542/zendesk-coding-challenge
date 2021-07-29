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