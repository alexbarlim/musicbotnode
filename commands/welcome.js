const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");
const Discord = require("discord");

const canvas = Canvas.createCanvas(700, 250);
const ctx = canvas.getContext("2d");
(async () => {
    const background = await Canvas.loadImage("../src/img/wallpaper.png");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#0800ff";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Slightly smaller text placed above the member's display name
    ctx.font = "28px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
        "Welcome to the server,",
        canvas.width / 2.5,
        canvas.height / 3.5
    );
    const applyText = (canvas, text) => {
        const ctx = canvas.getContext("2d");

        let fontSize = 70;

        do {
            // Assign the font to the context and decrement it so it can be measured again
            ctx.font = `${(fontSize -= 10)}px sans-serif`;
            // Compare pixel width of the text to the canvas minus the approximate avatar size
        } while (ctx.measureText(text).width > canvas.width - 300);

        // Return the result to use in the actual canvas
        return ctx.font;
    };

    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
        `${member.displayName}!`,
        canvas.width / 2.5,
        canvas.height / 1.8
    );
    const guild = client.guilds.cache.get("463027132243771403");
    var getmemberCount = guild.memberCount;
    ctx.font = "24px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
        `Member #${getmemberCount}`,
        canvas.width / 2.5,
        canvas.height / 1.45
    );
    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = async () => {
        await Canvas.loadImage(member.user.displayAvatarURL({ format: "jpg" }));
    };
    ctx.drawImage(avatar, 25, 25, 200, 200);
    ctx.lineWidth = 13;
    ctx.strokeStyle = "white";
    ctx.stroke();
})();
const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "welcome-image.png"
);
module.exports = attachment;
