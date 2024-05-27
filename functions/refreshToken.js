async function go(user) {
    try {
        fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `client_id=${config.bot.client_id}&client_secret=${config.bot.client_secret}&grant_type=refresh_token&refresh_token=${user.refreshToken}&redirect_uri=${config.bot.callbackURL}&scope=identify guilds guilds.join email`
        }).then(async response => {
            response = await response.json();
            if (response.error) return console.log(response.error);
            await userModel.findOneAndUpdate({ userID: user.userID }, { accessToken: response.access_token, refreshToken: response.refresh_token, updateAt: moment().format('YYYY-MM-DD HH:mm:ss') });
        }).catch(error => {
            console.log(error);
        });
    } catch (err) {
        console.log(err);
    }
}

async function refresh() {
    let users = await userModel.find({}).sort({ updateAt: -1 });
    users.forEach(async (user) => {
        if (moment().diff(moment(user.updateAt), 'minutes') < 45) return;
        await go(user);
    });
}

module.exports = refresh;