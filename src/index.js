const express = require('express');
const amqplib = require('amqplib');
const { ServerConfig } = require('./config');
const { EmailService } = require('./services');

const apiRoutes = require('./routes');

async function connectQueue() {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertQueue('notification-queue');
        channel.consume('notification-queue', async (data) => {
            console.log(`${Buffer.from(data.content)}`);
            const object = JSON.parse(`${Buffer.from(data.content)}`);
            await EmailService.sendEmail(
                'flightnotification01@gmail.com',
                object.recepientEmail,
                object.subject,
                object.text
            );
            channel.ack(data);
        })
    } catch (error) {
        console.log(error);
    }
}



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes)

app.listen(ServerConfig.PORT, async () => {
    console.log("Successfully started the server on " + ServerConfig.PORT);
    await connectQueue();
    console.log('queue is up');
})