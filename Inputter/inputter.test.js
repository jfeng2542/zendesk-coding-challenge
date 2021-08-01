const printer = require('../Printer/printer.js');
const requester = require('../Requester/requester.js');
const inputter = require('./inputter.js');
const { TOKEN } = require('../token.js');

/*
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ data })
    })
);

beforeEach(() => {
    fetch.mockClear();
});
*/

describe('inputter tests', () => {
    // Tests for initial/first menu options
    it('should return the menu', () => {
        const consoleOutput = new printer();
        const ticketRequest = new requester(TOKEN, consoleOutput);
        const consoleInput = new inputter(ticketRequest, consoleOutput);
        consoleInput.inputOptions('menu');      // 'menu' option doesn't require an await
    })

    it('should send user to an interactive all-tickets page menu', async() => {
        const consoleOutput = new printer();
        const ticketRequest = new requester(TOKEN, consoleOutput);
        const consoleInput = new inputter(ticketRequest, consoleOutput);
        await consoleInput.inputOptions('1');
    }, 30000)                                   // Set timer to 30 seconds to allow for timely interaction with the menu

    it('should return ticket information based on user-requested ID', async() => {
        const consoleOutput = new printer();
        const ticketRequest = new requester(TOKEN, consoleOutput);
        const consoleInput = new inputter(ticketRequest, consoleOutput);
        await consoleInput.inputOptions('2');
    }, 10000)                                   // Allowed 10 seconds for tester to type any ID

    it('should state that the command is invalid', () => {
        const consoleOutput = new printer();
        const ticketRequest = new requester(TOKEN, consoleOutput);
        const consoleInput = new inputter(ticketRequest, consoleOutput);
        consoleInput.inputOptions('bad input');
    })

    it('should return value of \'true\' and send goodbye message if user input is \'exit\'', async() => {
        const consoleOutput = new printer();
        const ticketRequest = new requester(TOKEN, consoleOutput);
        const consoleInput = new inputter(ticketRequest, consoleOutput);
        let output = await consoleInput.inputOptions('exit');
        expect(output).toEqual(true);           // Tests for actual return value of inputOptions()
    })

    it('should return value of \'false\' if user input is anything but \'exit\'', async() => {
        const consoleOutput = new printer();
        const ticketRequest = new requester(TOKEN, consoleOutput);
        const consoleInput = new inputter(ticketRequest, consoleOutput);
        let output = await consoleInput.inputOptions('anything but exit');
        expect(output).toEqual(false);
    })

    // Tests for all-tickets menu
    it('should request for the previous page of the current all-tickets page', async() => {
        // This test can only be performed under the assumption that the user has already loaded one of the all-tickets pages
        
    })

    it('should send a menu exit message', () => {
        const consoleOutput = new printer();
        const ticketRequest = new requester(TOKEN, consoleOutput);
        const consoleInput = new inputter(ticketRequest, consoleOutput);
        consoleInput.paginationInputOptions('stop');
    })

    it('should point out that the command is not legitimate for this menu', () => {
        const consoleOutput = new printer();
        const ticketRequest = new requester(TOKEN, consoleOutput);
        const consoleInput = new inputter(ticketRequest, consoleOutput);
        consoleInput.paginationInputOptions('exit');
    })

    it('should return \'true\' if user input is \'stop\'', async() => {
        const consoleOutput = new printer();
        const ticketRequest = new requester(TOKEN, consoleOutput);
        const consoleInput = new inputter(ticketRequest, consoleOutput);
        let output = await consoleInput.paginationInputOptions('stop');
        expect(output).toEqual(true);
    })

    it('should return \'false\' if user input is anything but \'stop\'', async() => {
        const consoleOutput = new printer();
        const ticketRequest = new requester(TOKEN, consoleOutput);
        const consoleInput = new inputter(ticketRequest, consoleOutput);
        let output = await consoleInput.paginationInputOptions('anything but stop');
        expect(output).toEqual(false);
    })
})