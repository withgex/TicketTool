const chalk = require('chalk');
const figlet = require("figlet");

module.exports = async function(client) {
    console.log(chalk.yellow.bold(figlet.textSync("Gex Tools!")));
    await console.log(chalk.red.bold(client.user.tag) + chalk.blue.bold("Estoy Preparado!"));

    await client.user.setActivity(require('../../config/bot').prefix + "help"); // Don't Remove Credits Might Get You in Danger
    await client.user.setStatus("idle");
}
