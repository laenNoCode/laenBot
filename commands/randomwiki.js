function main(message)
{
    const fetch = require('node-fetch');
    function getPage(){
    var url = "https://fr.wikipedia.org/w/api.php?action=query&format=json&list=random&prop=info&inprop=url&rnnamespace=0";
    fetch(url).then((data) => {
        data.json().then((json)=>
        {
            id = json.query.random[0].id;
            title = json.query.random[0].title
            message.channel.send("https://fr.wikipedia.org/w/index.php?curid="+id+"\n"+title);
            
        })
    })
    }
    getPage();
}
exports.main = main;