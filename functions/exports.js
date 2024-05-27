const system = {
    log: require('./log.js'),
    refresh: require('./refreshToken.js'),
    replyError: require('./discordMessage.js').replyError,
    replySuccess: require('./discordMessage.js').replySuccess,
    fastDB: require('./localDataBase.js'),
    loadUsers: require('./loadUsers.js'),
};

module.exports.system = system;