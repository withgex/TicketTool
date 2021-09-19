module.exports = {
    name: "prefix",
    cooldown: 5,
    aliases: ["!"],

    run: async function(client, message, args) {
        try {
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.channel.send({
                    embed: {
                        title: `**❌ | Error**`,
                        description: `Necesitas los mismos permisos para usar este comando`,
                        color: 0xFF0000
                    }
                }).then(async function(msg) {
                    setTimeout(() => {
                        msg.delete().catch(err => { return })
                    }, 1000 * 7);
                })
                return
            }
            var prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`);
            if (prefix == null) prefix = require('../../config/bot').prefix;
            var newPrefix = args.join(' ')
            if (!newPrefix) {
                require('quick.db').set(`prefix_${message.guild.id}`, require('../../config/bot').prefix);
                message.channel.send({
                    embed: {
                        description: `El prefijo del bot ha pasado a **${require('../../config/bot').prefix}**`,
                        color: 0x00D700
                    }
                }).then(async function(msg) {
                    setTimeout(() => {
                        msg.delete().catch(err => { return })
                    }, 1000 * 7);
                })
            } else if (newPrefix) {
                if (newPrefix.length > 7) {
                    message.channel.send({
                        embed: {
                            color: 0xFF0000,
                            title: `**❌ | Error**`,
                            description: `Este prefijo es demasiado largo`
                        }
                    }).then(async function(msg) {
                        setTimeout(() => {
                            msg.delete().catch(err => { return })
                        }, 1000 * 7);
                    })
                    return
                }
                require('quick.db').set(`prefix_${message.guild.id}`, newPrefix);
                message.channel.send({
                    embed: {
                        description: `El prefijo del bot ha cambiado a **${newPrefix}**`,
                        color: 0x00D700
                    }
                })
            }
        } catch (err) {
            return;
        }
    }
}
