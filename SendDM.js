module.exports = {
    name: "Send DM",
    author: ["aoe#4851"],
    version: "1.0.2",
    changelog: "Added Embed ~ PlayboyPrime#3839 | Fixed ~ NickG#9306",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Message",
    html: function (data) {
        return `
                <div class="form-group">
                    <label>Message Type</label>
                    <div class="form-group">
                    <select class="form-control" name="msgtype">
                        <option value="msg" selected>Message</option>
                        <option value="embed">Embed</option>
                    </select>
                </div>
                <div class="form-group">
                    <div class="form-group">
                    <label>The User Tag (Use {user} to get a Mentioned User) *</label>
                    <div class="input-group mb-3">
                        <textarea class="form-control field" name="usertag" id="usertag" rows="1" ></textarea>
                        <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="usertag">Insert Variable</a>
                    </div>
                </div>
                <hr>
                <p><strong>Message</strong></p>
                <div class="form-group">
                    <div class="form-group">
                    <label>The Message content</label>
                    <div class="input-group mb-3">
                        <textarea class="form-control field" name="msg" id="msg" rows="3" ></textarea>
                        <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="msg">Insert Variable</a>
                    </div>
                </div>
                <hr>
                <p><strong>Embed</strong></p>
                <div class="form-group">
                    <label>Color</label>
                    <input class="form-control jscolor" name="color" id="color" placeholder="#FFFFFF">
                    <small class="form-text text-muted">Hex color</small>
                </div>
                <div class="form-group">
                    <div class="form-group">
                    <label>Title</label>
                    <div class="input-group mb-3">
                        <textarea class="form-control field" name="title" id="title" rows="1" ></textarea>
                        <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="title">Insert Variable</a>
                    </div>
                </div>
                </div>
                <div class="form-group">
                    <label>Url</label>
                    <div class="input-group mb-3">
                        <textarea class="form-control field" name="url" id="url" rows="1" ></textarea>
                        <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="url">Insert Variable</a>
                    </div>
                </div>
                </div>
                <div class="form-group">
                    <label>Author</label>
                    <div class="input-group mb-3">
                        <textarea class="form-control field" name="author" id="author" rows="1" ></textarea>
                        <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="author">Insert Variable</a>
                    </div>
                </div>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <div class="input-group mb-3">
                        <textarea rows="5" class="form-control field" name="description" id="description"></textarea>
                        <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="title">Insert Variable</a>
                    </div>
                </div>
                </div>
                <div class="form-group">
                    <label>Thumbnail Url</label>
                    <div class="input-group mb-3">
                        <textarea class="form-control field" name="thumbnail" id="thumbnail" rows="1" ></textarea>
                        <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="thumbnail">Insert Variable</a>
                    </div>
                </div>
                </div>
                <div class="form-group">
                    <label>Image Url</label>
                    <div class="input-group mb-3">
                        <textarea class="form-control field" name="image" id="image" rows="1" ></textarea>
                        <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="url">Insert Variable</a>
                    </div>
                </div>
                </div>
                <div class="form-group">
                    <label>Footer</label>
                    <div class="input-group mb-3">
                        <textarea class="form-control field" name="footer" id="footer" rows="1" ></textarea>
                        <div class="input-group-append">
                    <a class="btn btn-outline-primary" role="button" id="variables" forinput="footer">Insert Variable</a>
                    </div>
                </div>
        `;
    },
    init: async function ()
    {
        console.log("Loaded DM Mod ~ aoe#4851");
    },
    mod: async function (DBS, message, action, args, command, index) {
        const Discord = require("discord.js");
        if (action.usertag == "{user}")
        {
            let member1 = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());
            if (action.msgtype == "msg")
            {
                member1.send(DBS.BetterMods.parseAction(action.msg, message));
            }
            else
            {
                const Embed = new Discord.MessageEmbed()
                    .setTitle(DBS.BetterMods.parseAction(action.title, message))
                    .setURL(DBS.BetterMods.parseAction(action.url, message))
                    .setAuthor(DBS.BetterMods.parseAction(action.author, message))
                    .setDescription(DBS.BetterMods.parseAction(action.description, message))
                    .setThumbnail(DBS.BetterMods.parseAction(action.thumbnail, message))
                    .setImage(DBS.BetterMods.parseAction(action.image, message))
                    .setFooter(DBS.BetterMods.parseAction(action.footer, message))
                    .setTimestamp()
                    .setColor(action.color)
                member1.send({ embeds: [Embed] });
            }
        }
        else
        {
            let member = DBS.Bot.users.cache.find(user => user.tag == DBS.BetterMods.parseAction(action.usertag, message));
            if (action.msgtype == "msg")
            {
                member.send(DBS.BetterMods.parseAction(action.msg, message))
            }
            else
            {
                const Embed = new Discord.MessageEmbed()
                    .setTitle(DBS.BetterMods.parseAction(action.title, message))
                    .setURL(DBS.BetterMods.parseAction(action.url, message))
                    .setAuthor(DBS.BetterMods.parseAction(action.author, message))
                    .setDescription(DBS.BetterMods.parseAction(action.description, message))
                    .setThumbnail(DBS.BetterMods.parseAction(action.thumbnail, message))
                    .setImage(DBS.BetterMods.parseAction(action.image, message))
                    .setFooter(DBS.BetterMods.parseAction(action.footer, message))
                    .setTimestamp()
                    .setColor(action.color)
                member.send({ embeds: [Embed] });
            }
        }
        DBS.callNextAction(command, message, args, index + 1);

    }
};