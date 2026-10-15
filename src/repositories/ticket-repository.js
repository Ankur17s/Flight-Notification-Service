const CRUDRepository = require("./crud-repository");
const { Ticket } = require('../models');

const { Enums } = require('../utils/common');
const { PENDING } = Enums.NOTIFICATION_TICKET_STATUS;

class TicketRepository extends CRUDRepository {
    constructor() {
        super(Ticket)
    }

    async getPendingTickets() {
        const response = await Ticket.findAll({
            where: {
                status: PENDING
            }
        });
        return response;
    }
}

module.exports = TicketRepository;