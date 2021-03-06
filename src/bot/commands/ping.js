const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    cooldown: 7,
    aliases: ["ping"],
    run: async(client, message) => {
        try {
            var states = "๐ข Excellent";
            var states2 = "๐ข Excellent";
            var msg = `${Date.now() - message.createdTimestamp}`;
            var api = `${Math.round(client.ws.ping)}`;
            if (Number(msg) > 70) states = "๐ข Buena";
            if (Number(msg) > 170) states = "๐ก Regular";
            if (Number(msg) > 350) states = "๐ด Mala";
            if (Number(api) > 70) states2 = "๐ข Buena";
            if (Number(api) > 170) states2 = "๐ก Regular";
            if (Number(api) > 350) states2 = "๐ด Mala";
            if (message.author.bot) return;
            message.channel.send(
                new MessageEmbed()
                .setColor("#2F3136")
                .setAuthor(message.author.username, message.author.avatarURL())
                .addField("**Time Taken:**", msg + " ms ๐ถ | " + states, true)
                .addField("**WebSocket:**", api + " ms ๐ถ | " + states2, true)
                .setTimestamp()
                .setFooter(`Peticiรณn de ${message.author.tag}`)
            );
        } catch (err) {
            return;
        }
    }
};
