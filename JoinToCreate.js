module.exports = {
    name: "voiceStateUpdate",
    author: ["PlayboyPrime#3839"],
    version: "1.0.0",
    changelog: "Release",
    isEvent: true,
    isMod: true,

    init: function() {
        const path = require("path")
        const fs = require("fs")
        const config = require("./JoinToCreate/config.json")

        if(fs.existsSync(path.join(__dirname, "JoinToCreate", "config.json"))){
            config.lastid = ""
        } else DBS.BetterMods.Logger.error("[JoinToCreate MOD] The JoinToCreate folder is missing files or was not found.");

        console.log("Loaded JoinToCreate");
    },

    mod: async function (DBS, oldState, newState) {
        const config = require("./JoinToCreate/config.json")
        const path = require("path")
        const fs = require("fs")

        var temp = {
            "id": "",
            "creator": ""
        }

        if(config.consoleinformation == "true"){
            var cibool = true 
        } else var cibool = false
        
        if(newState.member.user.id == config.lastid){
            return 
        } else {
            if(cibool) console.log("[JTC] VoiceState update.")
            config.lastid = newState.member.user.id
            setTimeout(() => {
                config.lastid = ""
            }, 10);
        }

        function variables(string){
            return string
                .replace("{user.name}", newState.member.user.username)
                .replace("{user.discriminator}", newState.member.user.discriminator)
                .replace("{user.id}", newState.member.user.id)
                .replace("{guild.name}", newState.guild.name)
                .replace("{guild.id}", newState.guild.id)
        }

        if(oldState.channel !== newState.channel && newState.channel && newState.channel == config.voiceid){
            const vc = await newState.guild.channels.create(variables(config.channelsettings.newChannelName), {
                type: "GUILD_VOICE",
                parent: newState.guild.channels.cache.find(cat=> cat.id == config.channelsettings.newChannelCategoryId),
                permissionOverwrites: [
                    {
                      id: newState.member.user.id
                    },
                ]
            })
            temp.id = vc.id; 
            temp.creator = newState.member.user.id; 
            config.vcs.push(temp);

            if(cibool) console.log("[JTC] Created voice channel: " + vc.name)
            newState.member.voice.setChannel(vc); if(cibool) console.log("[JTC] Moved user: " + newState.member.user.username)

            if(cibool) console.log("[JTC] Setting permissions up.")
            const { Permissions } = require('discord.js');
            if(config.channelsettings.creatorCanKick == "true"){
                vc.permissionOverwrites.set([
                    {
                        id: newState.member.user.id,
                        allow: [Permissions.FLAGS.MOVE_MEMBERS]
                    }
                ])
            } 
        } 

        

        if(oldState.channel !== newState.channel && config.channelsettings.deleteChannelAfterLeave == "true"){
            for (i = 0; i < config.vcs.length; i++) {
                if(config.vcs[i].creator == newState.member.user.id && config.vcs[i].id == oldState.channelId){
                    if(cibool) console.log("[JTC] Creator left. Deleting channel: " + newState.guild.channels.cache.find(ch => ch.id == config.vcs[i].id).name)
                    newState.guild.channels.cache.find(ch => ch.id == config.vcs[i].id).delete()
                }
            }
        }
    } 
};