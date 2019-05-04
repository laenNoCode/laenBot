function main(message)
{
    console.log("adding a subscriber");
    var subscriberFilePath = "save/subscribers/laenBot/subscribers.json";
    const fs = require("fs");
    fs.readFile(subscriberFilePath,"utf8",(err,data) =>
    {
        
        if (message.mentions.users.first() == null){
            message.channel.send("you must mention somebody");
            return;
        }
        var user = message.mentions.users.first();
        var file = JSON.parse(data);
        if (file.subscribers.includes(user.id)){
            message.channel.send("this user is already a subscriber")
            return;
        }
        file.subscribers.push(user.id);
        fs.writeFile(subscriberFilePath, JSON.stringify(file));
        message.channel.send("user registered");
        user.send("you successfully registered updates");
        
        
    });
}
exports.main = main;