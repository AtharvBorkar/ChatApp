import dotenv from 'dotenv';
import amqp from 'amqplib';
let channel;
export const connectRabbitMQ = async () => {
    try {
        const { Rabbitmq_Host, Rabbitmq_Username, Rabbitmq_Password } = process.env;
        if (!Rabbitmq_Host || !Rabbitmq_Username || !Rabbitmq_Password) {
            throw new Error("Missing RabbitMQ environment variables");
        }
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: Rabbitmq_Host,
            port: 5672,
            username: Rabbitmq_Username,
            password: Rabbitmq_Password,
        });
        channel = await connection.createChannel();
        console.log("✅ Connected to RabbitMQ");
    }
    catch (error) {
        console.log("Failed to connect to rabbitmq", error);
    }
};
export const publishToQueue = async (queueName, message) => {
    if (!channel) {
        console.log("RabbitMQ channel is not inatailized");
        return;
    }
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
        persistent: true,
    });
};
//# sourceMappingURL=rabbitmq.js.map