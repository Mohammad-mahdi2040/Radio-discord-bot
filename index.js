const Discord = require("discord.js")
const ytdl = require("ytdl-core")
const {
    TOKEN,
    channel_id,
    video_urls,
    owner,
    prefix,
    status,
    membervc,
    countmember
} = require("./config.json")
const client = new Discord.Client()


client.on("ready", () => {
    console.log(`RADIO ${client.user.tag} NOW ON AIR `)
    client.user.setPresence({
    status: (status),
    activity: {
        name: ``,
        type: 'CUSTOM_STATUS',// COMPETING STREAMING LISTENING WATCHING PLAYING <CUSTOM_STATUS>
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

client.on("ready", () => {
    function status() {
        const micneshin = client.guilds.cache.get(membervc)
        const membercount = client.guilds.cache.get(countmember)
        const voiceChannels = micneshin.channels.cache.filter(c => c.type === 'voice');
        let count = 0;

        for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
        let go = ["Text 1" , "Text 2",`${count}`,`${membercount.memberCount}`]
        let plsc = ["Format 1","Format 2"]
        let Power = Math.floor(Math.random() * go.length);
        client.user.setActivity(go[Power], {type: plsc[Power]});
      }; setInterval(status, 2900)
    });

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
