var wordfilter = require('wordfilter');
let User = require('../components/models/user');

module.exports = function(controller) {

    controller.middleware.heard.use(function(bot, message, next){
        let text = message.text.split(" ");
        let found = false;
        if(text[0] == "/points"){
            if(text[1] && text[2]){
                if(text.length > 2){
                    let name = "";
                    let count = 0;
                    for(let i = 0; i < text.length; i++){
                        if(i >= 2) name += text[i];
                    }
                    User.UpdateUser({points: text[1], name: name}, function(result){
                        message.user_profile = result.message;
                        next();
                    })
                }else{
                    message.user_profile = "Looks like you have forgotten a part. Please format this correctly like \"/points '# of points' 'name of person'\"";
                    next();
                }
            }else{
                message.user_profile = "Looks like you have forgotten a part. Please format this correctly like \"/points '# of points' 'name of person'\"";
                next();
            }
        }else if(text[0] == "/remove"){
            if(text[1]){
                let name = "";
                for(let i = 0; i < text.length; i++){
                    if(i >= 1) name += text[i];
                }
                User.RemoveUser({name: name}, function(result){
                    message.user_profile = result.message;
                    next();
                })
            }else{
                message.user_profile = "Looks like you have forgotten a part. Please format this correctly like \"/remove 'users name'\"";
                next();
            }
        }else if(text[0] == "/reset"){
            User.ResetPoints(function(result){
                message.user_profile = result.message;
                next();
            });
        }else if(text[0] == "/user"){
            if(text[1]){
                let name = "";
                for(let i = 0; i < text.length; i++){
                    if(i >= 1) name += text[i];
                }
                User.AddUser({name: name}, function(result){
                    message.user_profile = result.message;
                    next();
                })
            }else{
                message.user_profile = "Looks like you have forgotten a part. Please format this correctly like \"/user 'new users name'\"";
                next();
            }
        }else if(text[0] == "/tally"){
            User.GetUsers(function(result){
                let messages = "";
                if(result.data){
                    for(let i = 0; i < result.data.length; i++){
                        messages += (i + 1)+". " + result.data[i].name + " has " + result.data[i].points + " points. \n"; 
                    }
                    message.user_profile = messages;
                    next();
                }else{
                    if(result.error){
                        message.user_profile = result.error;
                        next();
                    }else{
                        message.user_profile = "There were no users to tally.";
                        next();
                    }
                }
            });
        }else if(text[0] == "/help"){
            message.user_profile = "Here is a list of things you can say:\n1. /points '# of points' 'Name of person'\n2. /tally\n3. /remove 'users name'\n4. /user 'new users name'\n5. /reset";
            next();
        }else{
            message.user_profile = "Here is a list of things you can say:\n1. /points '# of points' 'Name of person'\n2. /tally\n3. /remove 'users name'\n4. /user 'new users name'\n5. /reset";
            next();
        }
    });

    controller.hears(['^/points (.*)', '^/remove (.*)', '^/reset', '^/user (.*)', '^/tally', '^/help'], 'direct_message,direct_mention', function(bot, message){
        console.log("Made it to the hears reply section", message.user_profile);
        bot.reply(message, message.user_profile);
    });

};
