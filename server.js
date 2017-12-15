require('dotenv').configure();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const groupId = process.env.ADMIN_GROUP_ID;
const selfId = token.substring(0, token.indexOf(':'));

const bot = new TelegramBot(token, { polling: true });

bot.on('message', msg => {
    console.log(msg);
    if (msg['chat']['type'] == 'private') {
        bot.forwardMessage(groupId, msg['chat']['id'], msg['message_id']);
    } else if (msg['chat']['id'] == groupId && msg['reply_to_message'] && msg['reply_to_message']['forward_from'] && msg['reply_to_message']['from']['id'] == selfId) {
        if (msg['text'])
            bot.sendMessage(msg['reply_to_message']['forward_from']['id'], msg['text']);
        else if (msg['photo']) {
            let fileId = '';
            let maxFileSize = 0;
            for (photoSize of msg['photo']) {
                if (photoSize['width'] * photoSize['height'] > maxFileSize) {
                    fileId = photoSize['file_id'];
                    maxFileSize = photoSize['width'] * photoSize['height'];
                }
            }
            bot.sendPhoto(msg['reply_to_message']['forward_from']['id'], fileId, { caption: msg['caption'] });
        }
        // bot.deleteMessage(groupId, msg['reply_to_message']['message_id']);
        // bot.deleteMessage(groupId, msg['message_id']);
    } else if (msg['chat']['id'] == groupId) {
        // bot.deleteMessage(groupId, msg['message_id']);
    }
});
