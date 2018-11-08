let env = require('node-env-file');
env(__dirname + '/.env');
let Botkit = require('botkit');
let debug = require('debug')('botkit:main');

let controller = Botkit.sparkbot({
    public_address: process.env.public_address,
    ciscospark_access_token: process.env.access_token,
    secret: process.env.secret,
    webhook_name: 'Steele Workshop'
});

let webserver = require(__dirname + '/components/express_webserver.js')(controller);

let mongoose = require(__dirname + "/components/mongoose.js");

require(__dirname + '/components/subscribe_events.js')(controller);

let normalizedPath = require("path").join(__dirname, "skills");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./skills/" + file)(controller);
});