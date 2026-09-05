import amqp from 'amqplib';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
export const startSendOtpConsumer = async () => {
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
    }
    catch (error) {
        console.log("Failed to start rabbitmq consumer", error);
    }
};
//# sourceMappingURL=consumer.js.map