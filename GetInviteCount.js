module.exports = {
    name: "GetInviteCount",
    author: ["aoe#4851"],
    version: "0.0.3",
    changelog: "Updated for DJS v13 ~ NickG#9306 | Fixed ~ NickG#9306",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Server Action",
    html: function(data) {
        return `
        <div class="row">
        <div class="col">
            <label>Variable Type *</label>
            <select name="vartype" class="form-control">
                <option value="temp">Temp Variable</option>
                <option value="server">Server Variable</option>
                <option value="global">Global Variable</option>
            </select><br>
        </div>
        <div class="col">
            <label>Variable Name *</label>
            <input class="form-control" name="varname"></input><br>
        </div>
        </div>
        `;
    },
    init: function() {
        console.log("Loaded GetInviteCount Mod ~ aoe#4851");
    },
    mod: async function(DBS, message, action, args, command, index) {
        const user = message.mentions.users.first() || message.author;
        const invites = await message.guild.invites.fetch();

        let userInvites = invites.filter(invite => invite.inviter.id === user.id);
        let userInviteCount = 0
        userInvites.forEach(invite => {
            userInviteCount += invite.uses;
        });

        DBS.BetterMods.saveVar(action.vartype, action.varname, userInviteCount, message.guild);
        DBS.callNextAction(command, message, args, index + 1);
    }
};
