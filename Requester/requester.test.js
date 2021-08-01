const printer = require('../Printer/printer.js');
const requester = require('./requester.js');
const { TOKEN } = require('../token.js');

describe('requester tests', () => {
    // Tests for fetching a ticket page
    it('should return the first 25 tickets', async() => {
        let page;                               // Initializes page before using itself as a parameter for requestOnePage()
        const consoleOutput = new printer();
        const ticketRequest = new requester(TOKEN, consoleOutput);
        page = await ticketRequest.requestOnePage('https://zccjef223.zendesk.com/api/v2/tickets.json?page[size]=25', page);
        expect(page.tickets).toBeTruthy();      // As long as if tickets are returned, toBeTruthy() returns true
    })

    it('should send a message stating that the page doesn\'t exist', async() => {
        const consoleOutput = new printer();
        const ticketRequest = new requester(TOKEN, consoleOutput);
        await ticketRequest.requestOnePage('https://zccjef223.zendesk.com/api/v2/tickets.json?page%5Bbefore%5D=eyJvIjoibmljZV9pZCIsInYiOiJhUUVBQUFBQUFBQUEifQ%3D%3D&page%5Bsize%5D=25');
    })

    it('should trigger an error 401 for unauthorization', async() => {
        let page;
        const consoleOutput = new printer();
        const ticketRequest = new requester('bad token', consoleOutput);
        page = await ticketRequest.requestOnePage('https://zccjef223.zendesk.com/api/v2/tickets.json?page[size]=25', page);
    })

    // Tests for fetching a ticket by ID
    it('should print information about ticket of ID 1', async() => {
        const consoleOutput = new printer();
        const ticketRequest = new requester(TOKEN, consoleOutput);
        await ticketRequest.requestOneTicket('https://zccjef223.zendesk.com/api/v2/tickets/1.json');
    })

    it('should trigger an error 400 for an invalid ID', async() => {
        const consoleOutput = new printer();
        const ticketRequest = new requester(TOKEN, consoleOutput);
        await ticketRequest.requestOneTicket('https://zccjef223.zendesk.com/api/v2/tickets/-1.json');
    })

    it('should trigger an error 401 for unauthorization', async() => {
        const consoleOutput = new printer();
        const ticketRequest = new requester('bad token', consoleOutput);
        await ticketRequest.requestOneTicket('https://zccjef223.zendesk.com/api/v2/tickets/1.json');
    })

    it('should trigger an error 404 for a ID that is valid but does not exist', async() => {
        const consoleOutput = new printer();
        const ticketRequest = new requester(TOKEN, consoleOutput);
        await ticketRequest.requestOneTicket('https://zccjef223.zendesk.com/api/v2/tickets/1000.json');
    })
});