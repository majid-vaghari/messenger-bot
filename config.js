const configurations = {
    'log': {
        'dir': './logs/'
    },
    'bot': {
        'webhook': true
    },
    'features': {
        'deleteConversationAfterReply': false,
        'deleteExcessMessages': false
    }
}

try {
    const local = require('./local_config.json')
    for (const config in local) {
        for (const key in local[config]) {
            configurations[config][key] = local[config][key]
        }
    }
} catch (e) {

}

module.exports = configurations
