/*
*  This class formats messages to be printed in the CLI
*/
class printer {
    constructor() {
        this.allTktsCount = 0;  // Will be used to determine Sam's response to paging through tickets
    }

    print(msg) {
        console.log(msg);
    }

    intro() {
        let msg = `\x1b[1m\x1b[32m
        x---------------x
        |    O     O    |
        |   _________   |
        |   \\_______/   |
        x---------------x
\x1b[1m\x1b[36mHi! My name is Sam, the Ticket Man :D`;
        this.print(msg);
    }

    initQuestion() {
        return '\n\x1b[1m\x1b[36mCommand me by typing \x1b[0m\'menu\'\x1b[1m\x1b[36m to see your choices, '
        + 'or \x1b[0m\'exit\'\x1b[1m\x1b[36m to quit: \x1b[0m';
    }

    menu() {
        let msg = '\n\x1b[1m\x1b[35mType \x1b[37m\'1\'\x1b[35m to view all tickets'
        + '\nType \x1b[37m\'2\'\x1b[35m to view one tickets (but you\'ll need to know an ID)'
        + '\nType \x1b[37m\'exit\'\x1b[35m to quit\n';
        this.print(msg);
    }

    ticketPrinter(id, subj, desc) {
        let msg = '\x1b[1m\x1b[32mID: ' + id + '\t\x1b[0m\x1b[33mSubject: ' + subj.padEnd(50)
        + '\x1b[1m\x1b[37mDescription: ' + desc.replace(/(\r\n|\n|\r)/gm," ").substring(0,50) + '...';
        this.print(msg);
    }

    allTicketsPrinter(tickets) {
        tickets.map(ticket => this.ticketPrinter(ticket.id, ticket.subject, ticket.description));
    }

    idQuestion() {
        return '\x1b[1m\x1b[32mType in an ID: \x1b[0m';
    }

    allTicketsQuestions() {
        let msg;

        switch(this.allTktsCount) {
            case 0:
                msg = '\n\x1b[0m(Sam thinks to himself: \x1b[32m\'teeheehee prepare to face my pun-believable puns!!!\'\x1b[0m)'
                + '\n\x1b[1m\x1b[36mCheck out the \x1b[37m\'prev\' \x1b[36mpage, \x1b[37m\'next\' \x1b[36mpage, '
                + 'or \x1b[37m\'stop\' \x1b[36mlooking at all the tickets: \x1b[0m';
                this.allTktsCount++;
                break;
            case 1:
                msg = '\n\x1b[1m\x1b[34mWow, that\'s tiring...You might not know but there\'s a '
                + 'LOT of heavy work being done behind the scenes to get you these tickets. It ain\'t easy. '
                + '\nAnyway, your call. \x1b[37m\'prev\'\x1b[34m, \x1b[37m\'next\'\x1b[34m, or \x1b[37m\'stop\': \x1b[0m';
                this.allTktsCount++;
                break;
            case 2:
                msg = '\n\x1b[0m\x1b[1m*huff* *huff* *puff*\x1b[35m Okay...I\'ll be honest...you\'re really pushing it. '
                + '\x1b[37m*puuufffff*\x1b[35m Are you...satisfied with...all these...tickets yet? \x1b[37m*PUUUFFFF*'
                + '\n\x1b[35mAt your...command, though...\x1b[37m\'prev\'\x1b[35m, \x1b[37m\'next\'\x1b[35m, '
                + 'or \x1b[31mSTO-\x1b[35mI mean...\x1b[37m\'stop\': \x1b[0m';
                this.allTktsCount++;
                break;
            default:
                msg = '\n\x1b[0m\x1b[1m*pant* *pant* *pant*\x1b[31m ...please... \x1b[37m*pant* *pant*\x1b[31m ...STOP! '
                + '\x1b[37m*pant* \x1b[31mInput... \x1b[37m*pant*\x1b[31m ...here: \x1b[0m';
                this.allTktsCount = 4;  // Sets value to not trigger any previous cases
        }
        return msg;
    }

    leavePaginationMenu() {
        let msg;
        if(this.allTktsCount < 3) msg = '\n\x1b[0m\x1b[1m\nNow leaving the all-tickets menu...';
        else msg = '\n\x1b[1m\x1b[36m\nTHANK GOODNESS! WE\'RE FINALLY LEAVING!!!';
        this.print(msg);
    }

    pageDoesNotExist() {
        let msg;
        if(this.allTktsCount < 3) {     // Does not change the message if user types 'prev' or 'next'
            msg = '\x1b[1m\x1b[35m\nSorry, this page doesn\'t exist :/';
            this.allTktsCount--;
        }
        else msg = '\x1b[1m\x1b[31m\nTHAT PAGE DOESN\'T EVEN EXIST! NOW PPPLLLEEEEAAAASSSSEEE LET ME REST!!! PLEEEAAASSSSEEEE!!!';
        this.print(msg);
    }

    sorry(inPageMenu) {
        let msg = '\x1b[1m\x1b[35mSorry, I don\'t know what you just said. I tend to forget words I used to know a minute ago...'
        + '\n...I need to go back to school...';
        if(inPageMenu && this.allTktsCount < 4) this.allTktsCount--;    // Does not change message if user types an incorrect input
        this.print(msg);
    }

    goodbye() {
        let msg = '\x1b[1m\x1b[32mGoodbye, have a great day!\x1b[0m';
        this.print(msg);
    }
}

module.exports = printer;