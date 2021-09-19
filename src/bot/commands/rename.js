const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
    name: "close",
    cooldown: 5,
    aliases: ["end"],

    run: async function(client, message, args) {
        try {
            var renameMessage = args.join(' ');
            if (!message.channel.name.includes("ticket-")) {
                message.channel.send({
                    embed: {
                        title: `**❌ | Error**`,
                        description: `Este no es un canal de entradas de Tickets`,
                        color: 0xFF0000
                    }
                }).then(async function(msg) {
                    setTimeout(() => {
                        msg.delete().catch(err => { return })
                    }, 1000 * 7);
                })
                return
            }
            if (!message.member.hasPermission('MANAGE_CHANNELS')) {
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
            if (!renameMessage) {
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
            let btn = new MessageButton()
                .setStyle("green")
                .setEmoji("✅")
                .setID("renameTicketTrue");
            let btn2 = new MessageButton()
                .setStyle("grey")
                .setEmoji("⛔")
                .setID("renameTicketFalse");
            let row = new MessageActionRow()
                .addComponent(btn)
                .addComponent(btn2);
            message.channel.send({
                embed: {
                    title: `**⚠️ | Confirmar**`,
                    description: `¿Estás segura de cambiar el nombre de este Ticket?`,
                    color: 0xFFF200
                },
                component: row
            }).then(async function(msg) {
                setTimeout(() => {
                    msg.delete().catch(err => { return })
                }, 1000 * 7);
                require('quick.db').set(`RenameTicket_${message.channel.id}`, renameMessage)
                require('quick.db').set(`DeleteRenameMessage_${message.channel.id}`, msg.id)
            })
        } catch (err) {
            return;
        }
    }
}
