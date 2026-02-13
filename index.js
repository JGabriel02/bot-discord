const { Client, GatewayIntentBits, PresenceUpdateStatus } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
  ]
});

client.once("ready", () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  if (message.content === "!betinha") {

    const membrosValidos = message.guild.members.cache.filter(member => {
      // ignora bots
      if (member.user.bot) return false;

      // ignora quem digitou o comando
      if (member.id === message.author.id) return false;

      // precisa estar online (não offline/invisible)
      return member.presence?.status && member.presence.status !== "offline";
    });

    if (membrosValidos.size === 0) {
      message.channel.send("Ninguém online pra ser moggado 😔");
      return;
    }

    const escolhido = membrosValidos.random();

    message.channel.send(
      `${escolhido} é um betinha e foi moggado`
    );
  }
});


client.login(process.env.TOKEN);

