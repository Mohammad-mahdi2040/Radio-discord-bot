const Discord = require("discord.js")
const ytdl = require("ytdl-core")
const {
    TOKEN,
    channel_id,
    video_urls,
    owner,
    prefix,
    status
} = require("./config.json")
const client = new Discord.Client()


client.on("ready", () => {
    console.log(`RADIO ${client.user.tag} NOW ON AIR `)
    client.user.setPresence({
    status: (status),
    activity: {
        name: `FA_NETWORK STUDIO`,
        type: 'PLAYING',// COMPETING STREAMING LISTENING WATCHING PLAYING <CUSTOM_STATUS>
    }
  })
    const voiceChannel = client.channels.cache.get(channel_id)
    voiceChannel.join().then(connection => {
        console.log("Joined voice channel")
        function play(connection) {
            const stream = ytdl(video_urls[Math.floor(Math.random() * video_urls.length)], { filter: "audioonly" })
            const dispatcher = connection.play(stream)
            dispatcher.on("finish", () => {
                play(connection)
            })
        }

        play(connection)
    })
})

client.on('message', message => {
      if (message.content === `${prefix}reset`) {
	  if (message.author.id !== `${owner}`) return false;
      message.channel.send(`Bot Disconnected From VC!`);
    client.destroy();
    client.login(TOKEN);
  
      }
    });

client.login(TOKEN)
//Made By FA_NETWORK STUDIO