import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';

const bot = new TelegramBot('5300027541:AAFs0HhA0ZJ2oyXby1aNYAesOmeOmIKFKbI', {polling: true});

bot.onText(/\/echo (.+)/, async (msg, match) => {
  const resp = match[1];
  const chat = await bot.getChat(msg.chat.id)
    bot.sendMessage(msg.chat.id, chat.first_name + ': ' + resp + '\n' + chat.username + '\n' + chat.id + '\n' + chat.type)
});

bot.on('message', msg => {
  console.log(msg.text);
  bot.sendMessage(msg.chat.id, `echo "${msg.text}"`); //, ${msg.chat.first_name} ${JSON.stringify(msg.chat)}
});
