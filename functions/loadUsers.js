async function addUsers(interaction, guild, part, total) {
    let users = await userModel.find({}).skip(part * config.addPartLimit).limit(config.addPartLimit).sort({ _id: -1 });
    let userLen = Math.ceil(users.length / config.addPartLimit);
    let i = 0;
    for (let user of users) {
        try {
            await guild.members.add(user.userID, { accessToken: user.accessToken });
            i++;
        } catch (err) {
            console.error(err);
        }
    }
    if (i > 0) {
        system.replySuccess(interaction, `${total + i} yedeklenmiş üye sunucuya eklendi.`);
    } else {
        system.replyError(interaction, "Yedeklenmiş üye bulunamadı.");
    }
    if (part < userLen) {
        setTimeout(() => {
            addUsers(interaction, guild, part + 1, total + i);
        }, 1000);
    }
}


async function loadUsers(interaction, serverID) {
    let guild = client.guilds.cache.get(serverID);
    if (!guild) return system.replyError(interaction, "Sunucu bulunamadı. Lütfen tekrar deneyiniz.");
    addUsers(interaction, guild, 0, 0);
}

module.exports = loadUsers;