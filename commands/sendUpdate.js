function main(message,args,client)
{
    var subscriberFilePath = "save/subscribers/laenBot/subscribers.json";
    const fs = require("fs");
    fs.readFile(subscriberFilePath,"utf8",(err,data) =>
    {
        var file = JSON.parse(data);
        file.subscribers.forEach(subscriberID => {
        client.fetchUser(subscriberID).then( (user)=>
        {
            user.dmChannel.send(args.join(" "));
            
        });
        });
    });
}
exports.main = main;