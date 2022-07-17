module.exports = {
    name: "JoinToCreateConfig",
    author: ["PlayboyPrime#3839"],
    version: "1.0.0",
    changelog: "Release",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Bot Action",

    html: function(data) {
        return `
        <div class="form-group">
            <h4><u>Channel Settings</u></h4>

            <div class="form-group">
                <label style="margin-top: 10px" for="newchannelname">New channel name *</label>
                <input class="form-control needed-field" name="newchannelname" id="newchannelname"></input>
                <h6 style="margin-top: 5px; color: lightgray">You can use variables. Check <a href="https://github.com/PlayboyPrime/JoinToCreate/blob/main/Variables.md" target="none">Github repo.</a></h6>
            </div>
            
            <div class="form-group">
                <label style="margin-top: 10px" for="newchannelcategory">Channel category</label>
                <input class="form-control" name="newchannelcategory" id="newchannelcategory" id="newchannelcategory"></input>
                <h6 style="margin-top: 5px; color: lightgray">Category id where a new channel will be placed.</h6>
            </div>
            

            <div class="form-group">
                <h6 style='float:left; margin-top:10px; width:375px'>Delete channel after creator leaves.</h6>
                <h6 style='float:left; margin-left:16; margin-top:10px'>Creator can kick.</h6>
            </div>
            <br></br>

            <form class="form-inline well">
                <div class="form-group">
                    <select style="width: 375px" class="form-control" name="delchafterleave" id="delchafterleave">
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select>

                    <select style="width: 375px; margin-left: 16px" class="form-control" name="creatorcankick" id="creatorcankick">
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select>
                </div>
            </form>
            <hr>

            <h4><u>Voice Settings</u></h4>

            <div class="form-group">
                <label style="margin-top: 10px" for="voiceid">Voice channel *</label>
                <input class="form-control needed-field" name="voiceid" id="voiceid"></input>
                <h6 style="margin-top: 5px; color: lightgray">Voice channel id where it waits for an user to join.</h6>
            </div>
        </div>

        <script>
            $(document).on("click", "#saveEditResponseBtn", function(e) {
                if(e.target === this){
                    const path = require("path")
                    const fs = require("fs")
                    const remote = require("electron").remote
                    const botpath = remote.getGlobal("sharedObj").botpath
                    const config = require(path.join(botpath, "BotFiles", "mods", "JoinToCreate", "config.json"))

                    console.log(config)

                    var temp = {
                        "channelsettings": {
                            "newChannelName": "",
                            "newChannelCategoryId": "",
                            "deleteChannelAfterLeave": "",
                            "creatorCanKick": ""
                        },
                    
                        "voiceid": "",
                    
                        "consoleinformation": "",
                    
                        "lastid": "",
                        "vcs":[]
                    }

                    temp.channelsettings.newChannelName = document.getElementById('newchannelname').value
                    temp.channelsettings.newChannelCategoryId = document.getElementById('newchannelcategory').value
                    temp.channelsettings.deleteChannelAfterLeave = document.getElementById('delchafterleave').value
                    temp.channelsettings.creatorCanKick = document.getElementById('creatorcankick').value
                    temp.voiceid = document.getElementById('voiceid').value

                    fs.writeFileSync(path.join(botpath, "BotFiles", "mods", "JoinToCreate", "config.json"), JSON.stringify(temp, null, 4))
                }
            })
        </script>
        `;
    },

    init: function(DBS) {
        const path = require("path")
        const fs = require("fs")
        if(!fs.existsSync(path.join(__dirname, "JoinToCreate.js"))) DBS.BetterMods.Logger.error("[JoinToCreateConfig] JoinToCreate.js was not found.")
        if(!fs.existsSync(path.join(__dirname, "JoinToCreate", "config.json"))) DBS.BetterMods.Logger.error("[JoinToCreateConfig] config.json was not found.")

        console.log("Loaded JoinToCreateConfig");
    },

    mod: function (DBS, message, action, args, command, index) {}
};