import amqp from 'amqplib';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const startSendOtpConsumer = async()=>{
    try{
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
        })
        const channel = await connection.createChannel()
        const queueName = "send-otp"
        await channel.assertQueue(queueName, { durable: true })
        console.log("✅ Mail Service consumer starrted, listing for otp emails")
        channel.consume(queueName, async(msg)=>{
            if(msg){
                try{
                    const {to, subject, text} = JSON.parse(msg.content.toString())
                    const { USER, PASS } = process.env;
                    if(!USER || !PASS){
                        throw new Error("Missing mail environment variables (USER/PASS)");
                    }
                    const transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        auth:{
                            user: USER,
                            pass: PASS,
                        }
                    })
                } catch(error){

                }
            }
        })
    } catch(error){
        console.log("Failed to start rabbitmq consumer", error);
    }
}