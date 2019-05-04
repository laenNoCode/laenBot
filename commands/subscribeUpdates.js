function main(message)
{
    var subscriberFilePath = "save/subscribers/laenBot/subscribers.json";
    const fs = require("fs");
    fs.readFile(subscriberFilePath,"utf8",(err,data) =>
    {
        var file = JSON.parse(data);
        if (file.subscribers.includes(message.author.id)){
            message.channel.send("this user is already a subscriber")
            return;
        }
        file.subscribers.push(message.author.id);
        fs.writeFile(subscriberFilePath, JSON.stringify(file));
        message.channel.send("user registered");
        message.author.send("you successfully registered updates");
        
        
    });
}
exports.main = main;