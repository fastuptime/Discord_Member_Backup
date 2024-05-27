const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: "admin_reg",
  usage: "/admin_reg <channel> <channel_welcome> <role_verify> <role_unverify> <title> <description>",
  category: "Bot",
  options: [
    {
      name: "channel",
      description: "Kanalı etiketleyiniz.",
      type: 7, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
      required: true,
    },
    {
      name: "channel_welcome",
      description: "Kanalı etiketleyiniz.",
      type: 7, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
      required: true,
    },
    {
      name: "role_verify",
      description: "Rolü etiketleyiniz.",
      type: 8, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
      required: true,
    },
    {
      name: "role_unverify",
      description: "Rolü etiketleyiniz.",
      type: 8, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
      required: true,
    },
    {
      name: "title",
      description: "Başlık giriniz.",
      type: 3, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
      required: true,
    },
    {
      name: "description",
      description: "Açıklama giriniz.",
      type: 3, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
      required: true,
    },
  ],
  admin: true,
  description: "Yetkilendirme mesajını gönderir.",
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: true }).catch(console.error);
    let channel = interaction.options.getChannel("channel");
    let channel_welcome = interaction.options.getChannel("channel_welcome");
    let role = interaction.options.getRole("role_verify");
    let role_unverify = interaction.options.getRole("role_unverify");
    let title = interaction.options.getString("title");
    let description = interaction.options.getString("description");
    if (!channel.permissionsFor(client.user).has("SEND_MESSAGES")) return system.replyError(interaction, "Botun mesaj gönderme izni yok.");
    if (!channel.permissionsFor(client.user).has("EMBED_LINKS")) return system.replyError(interaction, "Botun embed gönderme izni yok.");
    if(role.managed) return system.replyError(interaction, "Botun rolü yukarıda verilen rolün altında olmalıdır.");
    if(!role.editable) return system.replyError(interaction, "Botun rolü yukarıda verilen rolün altında olmalıdır.");
    if(role_unverify.managed) return system.replyError(interaction, "Botun rolü yukarıda verilen rolün altında olmalıdır.");
    if(!role_unverify.editable) return system.replyError(interaction, "Botun rolü yukarıda verilen rolün altında olmalıdır.");

    system.fastDB.set("channel_welcome", channel_welcome.id);
    system.fastDB.set("role", role.id);
    system.fastDB.set("role_unverify", role_unverify.id);
    system.fastDB.set("guild", interaction.guild.id);

    const embed = new EmbedBuilder()
      .setTitle(`${title}`)
      .setDescription(`${description}`)
      .setColor(0x00ff00)

    const linkButton = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel("Yetkilendirme")
      .setURL(`${config.AuthUrl}`)

    channel.send({ embeds: [embed], components: [new ActionRowBuilder().addComponents(linkButton)] }).then(() => {
      system.replySuccess(interaction, "Mesaj başarıyla gönderildi.");
    }).catch((err) => {
      system.replyError(interaction, "Bir hata oluştu. Lütfen tekrar deneyiniz.");
    });
  },
};