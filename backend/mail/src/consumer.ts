import amqp from 'amqplib';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const startSendOtpConsumer = async()=>{
    try{
        const connection = await amqp.connect({
            protocol: "amqp",
            
        })
    } catch(error){
        console.log("Failed to start rabbitmq consumer", error);
    }
}