const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    cooldown: 7,
    aliases: ["ping"],
    run: async(client, message) => {
        try {
            var states = "🟢 Excellent";
            var states2 = "🟢 Excellent";
            var msg = `${Date.now() - message.createdTimestamp}`;
            var api = `${Math.round(client.ws.ping)}`;
            if (Number(msg) > 70) states = "🟢 Buena";
            if (Number(msg) > 170) states = "🟡 Regular";
            if (Number(msg) > 350) states = "🔴 Mala";
            if (Number(api) > 70) states2 = "🟢 Buena";
            if (Number(api) > 170) states2 = "🟡 Regular";
            if (Number(api) > 350) states2 = "🔴 Mala";
            if (message.author.bot) return;
            message.channel.send(
                new MessageEmbed()
                .setColor("#2F3136")
                .setAuthor(message.author.username, message.author.avatarURL())
                .addField("**Time Taken:**", msg + " ms 📶 | " + states, true)
                .addField("**WebSocket:**", api + " ms 📶 | " + states2, true)
                .setTimestamp()
                .setFooter(`Petición de ${message.author.tag}`)
            );
        } catch (err) {
            return;
        }
    }
};
