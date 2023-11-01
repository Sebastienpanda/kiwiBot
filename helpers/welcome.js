import { createCanvas, GlobalFonts, Image } from "@napi-rs/canvas";
import { AttachmentBuilder } from "discord.js";
import { readFile } from "fs/promises";
import { request } from "undici";

GlobalFonts.registerFromPath("./font/HomemadeApple-Regular.ttf", "Homemade");

export const applyText = (canvas, text) => {
  const context = canvas.getContext("2d");
  let fontSize = 70;

  do {
    context.font = `${(fontSize -= 10)}px Homemade, sans-serif`;
  } while (context.measureText(text).width > canvas.width - 300);

  return context.font;
};

export async function welcome(member) {
  const membersCount = member.guild.members.cache.filter(
    (member) => !member.user.bot
  ).size;

  const welcomeChannel = member.guild.channels.cache.get(
    process.env.WELCOME_CHANNEL
  );

  const canvas = createCanvas(700, 250);
  const context = canvas.getContext("2d");

  const background = await readFile("./images/fond-white.png");
  const backgroundImage = new Image();
  backgroundImage.src = background;
  context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  context.font = applyText(canvas, `${member.user.username}`);
  context.fillStyle = "#ffffff";
  context.fillText(
    `${member.user.username}`,
    canvas.width / 2.5,
    canvas.height / 1.8
  );

  context.beginPath();
  context.arc(125, 125, 100, 0, Math.PI * 2, true);
  context.closePath();
  context.clip();

  const { body } = await request(
    member.user.displayAvatarURL({ format: "jpg" })
  );
  const avatar = new Image();
  avatar.src = Buffer.from(await body.arrayBuffer());
  context.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new AttachmentBuilder(canvas.toBuffer("image/png"), {
    name: "profile-image.png",
  });

  const welcomeEmbed = {
    color: 0x059669,
    title: "Bienvenue à toi, sur Vegas-Kiwi CHILL !",
    description: `${member.user}, nous sommes ${membersCount} membres sur le serveur`,
    image: {
      url: `attachment://${attachment.name}`,
    },
    timestamp: new Date().toISOString(),
    footer: {
      text: `${member.client.user.username} t'accueil les bras ouvert !`,
      icon_url: `${member.client.user.displayAvatarURL()}`,
    },
  };

  welcomeChannel.send({
    embeds: [welcomeEmbed],
    files: [attachment],
  });
}
