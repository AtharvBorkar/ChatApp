import amqp from 'amqplib';
let channel;
const { Rabbitmq_Host, Rabbitmq_Username, Rabbitmq_Password } = process.env;
if (!Rabbitmq_Host || !Rabbitmq_Username || !Rabbitmq_Password) {
    throw new Error("Missing RabbitMQ environment variables");
}
export const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: Rabbitmq_Host,
            port: 5672,
            username: Rabbitmq_Username,
            password: Rabbitmq_Password,
        });
        channel = await connection.createChannel();
        console.log("✅Connected to RabbitMQ");
    }
    catch (error) {
        console.log("Failed to connect to rabbitmq", error);
    }
};
//# sourceMappingURL=rabbitmq.js.map