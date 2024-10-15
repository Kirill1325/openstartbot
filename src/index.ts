import express from 'express';
import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
import http from 'http';
import { configure } from './appConfig';
import { getWeather } from './weatherController';

dotenv.config()

const app = express()

configure(app)

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
        await bot.sendMessage(chatId, 'Select your city')
    } else {
        const weather = await getWeather(text)
        if (weather instanceof Error) {
            await bot.sendMessage(chatId, 'City not found')
        } else {
            weather.writeDescription()
            await bot.sendMessage(chatId,
                `Current weather in ${weather.city}:\n${weather.temp}°C. ${weather.descriptionTemp} ${weather.descriptionHumidity}\nHumidity: ${weather.humidity}%`
            );
        }
    }


});



