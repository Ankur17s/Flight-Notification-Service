const { StatusCodes } = require('http-status-codes');
const { EmailService } = require('../services');

async function createTicket(req, res) {
    try {
        const response = await EmailService.createTicket({
            subject: req.body.subject,
            content: req.body.content,
            recepientEmail: req.body.recepientEmail
        });
        return res.status(StatusCodes.CREATED).send(response);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}

module.exports = {
    createTicket
}