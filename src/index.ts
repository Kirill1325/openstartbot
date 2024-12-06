import express from 'express';
import TelegramBot from 'node-telegram-bot-api'
import 'dotenv/config'
import http from 'http';
import { configure } from './appConfig';
import { createTables } from './bdConfig';
import { userController } from './userController';

const app = express()

configure(app)
createTables()

const PORT = process.env.PORT || 3000

const server = http.createServer(app)

console.log(`Attempting to run server on port ${PORT}`)

server.listen(PORT, () => console.log(`App listening on port ${PORT}`))

const token = process.env.TELEGRAM_TOKEN

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text

    if (text === '/start') {
        await bot.sendMessage(chatId, 'Select user id')
    } else {
        const user = await userController.getUserById(Number(text))
        if (user instanceof Error) {
            await bot.sendMessage(chatId, 'User not found')
        } else {
            await bot.sendMessage(chatId, `User: ${user.username}`);
        }
    }


});



