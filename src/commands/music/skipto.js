const { canModifyQueue } = require("../../util/Util");
const { MessageEmbed } = require("discord.js");
const {
  musicChannelOne,
  musicChannelTwo,
  musicChannelErrorResponse,
  primaryColor,
  errorColor,
} = require("../../../config.json");

module.exports = {
  name: "skipto",
  aliases: ["st"],
  description: "Pule para o número da fila selecionado",
  execute(message, args) {
    if (
      message.channel.id != musicChannelOne &&
      message.channel.id != musicChannelTwo
    ) {
      return message.author.send(musicChannelErrorResponse);
    }
    const noQa = new MessageEmbed()
      .setColor(errorColor)
      .setTitle("Uso")
      .setDescription(
        `${message.client.prefix}${module.exports.name} <Queue Number>`
      );

    if (!args.length || isNaN(args[0]))
      return message.reply(noQa).catch(console.error);

    const queue = message.client.queue.get(message.guild.id);

    const noQ = new MessageEmbed()
      .setColor(errorColor)
      .setTitle("Fila vazia")
      .setDescription("Não há nada na fila");

    if (!queue) return message.channel.send(noQ).catch(console.error);
    if (!canModifyQueue(message.member)) return;
    if (args[0] > queue.songs.length) {
      const noQw = new MessageEmbed()
        .setColor(errorColor)
        .setTitle("Erro!")
        .setDescription(`The queue is only ${queue.songs.length} songs long!`);

      return message.reply(noQw).catch(console.error);
    }
    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }

    queue.connection.dispatcher.end();

    const skipto = new MessageEmbed()
      .setColor(primaryColor)
      .setTitle("Pulada!")
      .setDescription(`${message.author} pulou ${args[0] - 1} songs`);

    queue.textChannel.send(skipto).catch(console.error);
  },
};
