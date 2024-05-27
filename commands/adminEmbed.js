module.exports = {
  name: "admin_embed",
  usage: "/admin_embed <channel> <title> <description> <color>",
  category: "Bot",
  options: [
    {
      name: "channel",
      description: "Kanalı etiketleyiniz.",
      type: 7, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
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
    {
      name: "color",
      description: "Renk giriniz. HEX Örnek: 0000FF",
      type: 3, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
      required: true,
    }
  ],
  admin: true,
  description: "Test",
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: true }).catch(console.error);
    let channel = interaction.options.getChannel("channel");
    let title = interaction.options.getString("title");
    let description = interaction.options.getString("description");
    let color = interaction.options.getString("color");
    if (!channel.permissionsFor(client.user).has("SEND_MESSAGES")) return system.replyError(interaction, "Botun mesaj gönderme izni yok.");

    const embed = new EmbedBuilder()
      .setTitle(`${title}`)
      .setDescription(`${description}`)
      .setColor(color)

    channel.send({ embeds: [embed] }).then(() => {
      system.replySuccess(interaction, "Mesaj başarıyla gönderildi.");
    }).catch((err) => {
      system.replyError(interaction, "Bir hata oluştu. Lütfen tekrar deneyiniz.");
    });
  },
};