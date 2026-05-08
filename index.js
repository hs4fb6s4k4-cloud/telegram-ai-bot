const express = require("express");
const { Telegraf } = require("telegraf");

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize bot - set BOT_TOKEN in Railway service variables
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply("Welcome!"));
bot.help((ctx) => ctx.reply("Send me a message and I will echo it."));
bot.on("text", (ctx) => ctx.reply(ctx.message.text));

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Bot is running");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
});

bot.launch();

// Graceful shutdown
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
