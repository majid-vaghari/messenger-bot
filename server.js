require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const logger = require('./initLogger')

const features = require('./config').features

const token = process.env.BOT_TOKEN
const groupId = process.env.ADMIN_GROUP_ID
const selfId = token.substring(0, token.indexOf(':'))

const bot = new TelegramBot(token, { polling: true })

bot.on('message', msg => {
  logger.info(msg)
  if (msg['chat']['type'] == 'private') {
    logger.debug('Private message received. Forwarding to admin group. Original sender:', msg['from'])
    bot.forwardMessage(groupId, msg['chat']['id'], msg['message_id'])
  } else if (msg['chat']['id'] == groupId && msg['reply_to_message'] && msg['reply_to_message']['forward_from'] && msg['reply_to_message']['from']['id'] == selfId) {
    logger.debug('Reply message detecteed. Sending reply to the receipient:', msg['reply_to_message']['forward_from'])
    if (msg['text']) { bot.sendMessage(msg['reply_to_message']['forward_from']['id'], msg['text']) } else if (msg['photo']) {
      logger.debug('Reply message was a photo.')
      let fileId = ''
      let maxFileSize = 0
      for (const photoSize of msg['photo']) {
        if (photoSize['width'] * photoSize['height'] > maxFileSize) {
          fileId = photoSize['file_id']
          maxFileSize = photoSize['width'] * photoSize['height']
        }
      }
      bot.sendPhoto(msg['reply_to_message']['forward_from']['id'], fileId, { caption: msg['caption'] })
    }
    if (features.deleteConversationAfterReply) {
      logger.debug('Conversation finished. Deleting message and reply...')
      bot.deleteMessage(groupId, msg['reply_to_message']['message_id']);
      bot.deleteMessage(groupId, msg['message_id']);
    }
  } else if (msg['chat']['id'] == groupId) {
    if (features.deleteExcessMessages) {
      logger.debug('Excess message received in admin group. Deleting...')
      bot.deleteMessage(groupId, msg['message_id']);
    }
  }
})
