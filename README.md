# Messenger Bot

This is a Telegram bot used to send messages to channel admins.

# Installation

 - clone the repository
 - create a file named `.env` in root directory of the project.
   containing the bot token and admin group id like so:
```dotenv
BOT_TOKEN="<bot token here>"
ADMIN_GROUP_ID="<admin group id here>"
```
   note that the admin group id shoud be a negative integer and the bot token should be of the form `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`. for more information go to [Telegram Bot API Documentation](https://core.telegram.org/bots/api)

 - _If you're running on **production** environment_, you should have an environment variable
   with the name of `NODE_ENV` and value of `production`. So if you're on production server,
   add this line before continuing:
```bash
export NODE_ENV=production
```
 - install dependencies:
```bash
npm install
```
 - run the server
```bash
npm start
```
