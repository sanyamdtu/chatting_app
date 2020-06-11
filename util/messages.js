var moment = require("moment");

function format_msg(username, text) {
    var res = {
        username,
        text,
        time: moment().format("h:mm a")
    }
    console.log(res)
    return res
}

module.exports = format_msg