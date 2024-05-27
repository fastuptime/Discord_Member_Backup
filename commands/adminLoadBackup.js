module.exports = {
  name: "admin_loadbackup",
  usage: "/admin_loadbackup <serverid>",
  category: "Bot",
  options: [
    {
      name: "serverid",
      description: "Sunucu ID'sini giriniz.",
      type: 3, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
      required: true,
    }
  ],
  admin: true,
  description: "Yedeklenmiş üyeleri sunucuya yükler.",
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: true }).catch(console.error);
    let serverID = interaction.options.getString("serverid");
    system.loadUsers(interaction, serverID);
  },
};