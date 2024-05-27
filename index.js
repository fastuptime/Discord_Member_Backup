const {
    Discord,
    Client,
    Intents,
    GatewayIntentBits ,
} = require('discord.js');
global.client = new Client({
    intents: [
        65591
	],
});
global.EmbedBuilder = require("discord.js").EmbedBuilder;
global.config = require('./config.js');
global.system = require('./functions/exports.js').system;
global.moment = require('moment');
global.mongoose = require('mongoose');
global.fetch = require('node-fetch');
global.fs = require('fs');
global.cron = require('node-cron');
global.app = require('express')();
const canvafy = require("canvafy");
////////////////////////
mongoose.connect(config.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    system.log(`MongoDB'ye bağlanıldı!`, 'success');
}).catch((err) => {
    system.log(`MongoDB bağlantısı başarısız!`, 'error');
    process.exit(0);
});

global.userModel = require('./models/user.js');
////////////////////////

require('./routers/authDiscord.js')();

require('./functions/loadCommands.js')(client);

client.on('ready', () => {
    system.log(`Discord'a giriş yapıldı! (${client.user.tag})`, 'success');
});
////////////////////////

cron.schedule('*/3 * * * *', () => {
    system.log(`Refresh işlemi başlatıldı!`, 'info');
    system.refresh();
});
system.refresh();

client.on('guildMemberAdd', async (member) => {
    let unverify = system.fastDB.get('role_unverify');
    if(!unverify) return system.log(`Unverify rolü ayarlanmamış!`, 'error');
    member.roles.add(unverify);
    const welcome = await new canvafy.WelcomeLeave()
        .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
        .setBackground("image", "https://cdn.discordapp.com/attachments/850808002545319957/859359637106065408/bg.png")
        .setTitle(`Hoşgeldin ${member.user.username}!`)
        .setDescription(`${member.guild.name} sunucusuna hoşgeldin!`)
        .setBorder("#2a2e35")
        .setAvatarBorder("#2a2e35")
        .setOverlayOpacity(0.3)
        .build();
    let channel = system.fastDB.get('channel_welcome');
    if(!channel) return system.log(`Hoşgeldin kanalı ayarlanmamış!`, 'error');
    channel = client.channels.cache.get(channel);
    let adminLog = client.channels.cache.get(config.adminLog_channel);
    if(!channel) return system.log(`Hoşgeldin kanalı bulunamadı!`, 'error');
    channel.send({ files: [{
        attachment: welcome.toBuffer(),
        name: `welcome-${member.id}.png`
        }]
    }).catch(console.error);
    if(adminLog) adminLog.send({ content: `${member} adlı kullanıcı sunucuya katıldı! (${member.id}) Onunla birlikte sunucumuzda ${member.guild.memberCount} kişiye ulaştık!` });
});

////////////////////////
client.login(config.bot.token).catch((err) => {
    system.log(`Token geçersiz!`, 'error');
    process.exit(0);
});

app.listen(80, () => {
    system.log(`Sunucu başlatıldı!`, 'success');
});