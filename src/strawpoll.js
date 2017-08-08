var snekfetch = require("snekfetch");

module.exports = {
    get: function(id) {
        return snekfetch.get("https://strawpoll.me/api/v2/polls/"+(id|0)).then(res=>JSON.parse(res.text)).catch(e=>console.log(JSON.parse("\""+e+"\"")));
    },
    make: function (opts) {
        return snekfetch.post("https://strawpoll.me/api/v2/polls").send(opts).then(res=>JSON.parse(res.text)).catch(e=>console.log(JSON.parse("\""+e+"\"")));
    }
}
