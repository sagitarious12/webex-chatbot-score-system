# Webex Chatbot Score System

this package was created with the intent of teaching how to make integrations into Cisco Webex Chat system. 

### What does this do?
This specific integration will allow you to add a user and add a score to that user and also see all of the users that you have created and their scores. The way that it works is by providing you with a list of commands that you can tell it. You can access that list by typing `/help` and the chatbot will respond with a list of things that it can accept. The chatbot `listens` for those commands and when it `hears` any of those commands it will do the work that is required of it. some of the commands also require some parameters and unless you provide the bot with those parameters it will not be able to perform those commands correctly.

## Installation

### First
Go to [Botkit studio](https://studio.botkit.ai/login) in order to get an access token to use [BotKit](https://botkit.ai/docs/). Once you get an access token, that needs to be placed in the .env file as the access_token.

![Building a bot with Botkit][Build-A-Bot-Botkit]
![Get the access token from Botkit][botkit-access-key]

### Second
Download the [Cisco Webex Desktop platform](https://www.webex.com/downloads.html) and install and run it. Once you get to the enter your work email address page just type in any email address and continue with creating a password.

![Login page on Webex Platform][webex-opening-screen]

Next thing that you need to do is go to the [Cisco Webex Developer Page](https://developer.webex.com/docs/bots) and log in with the email address that you just created on their desktop platform to register a new bot. After you have finished creating a new bot, make sure that you note the email address that you added for the bot because it will be used later on.

![Webex add bot button][Cisco-Developer-Create-Bot]
![Cisco Developer Create a Bot Form with the email][cisco-developer-create-bot-form-with-email]

### Third
Go to [M Labd](https://mlab.com/) to create a mongo db for your application. Log in or Sign up. click on "Create New" and go ahead and use the free sandbox plan. Select your loaction. create a database name, and submit your order. Click on the database that shows up in the list of databases. Now click on the users section and create a new user. Now you should see a section that has a bit of text that looks like this "mongodb://"dbuser":"dbpassword"@ds1111111.mlab.com:11111/"your database name"" make sure to replace the "dbuser" with the name of the user that you just created as well as for the "dbpassword". Paste that entire string of text into the .env file under mongo_connection.

![mlab-image][MLab-image]

### Fourth
Install [Heroku](https://devcenter.heroku.com/articles/heroku-cli) on your computer. After installation, go onto your command prompt and navigate to your repository location. Then type "heroku create". It will then generate a public location for your application to be hosted so that Cisco Webex can access it. Place the address that was just created into the public_address field of the .env file.

### Fifth
Fill in the remaining field in the .env file. the secret field is any password that you want.

### Sixth
Go into your [Heroku Dashboard](https://dashboard.heroku.com/apps) and click on the app that you just created. Go into the settings of the application and click on "Reveal Config Vars" This will be where you need to add each of the fields from the .env file into these locations. Add new fields for each .env line.

![Heroku Config variables][heroku-config]

### Seventh
Go back into the command prompt and type "git push heroku master" this will now upload the app and build it and run it.

### Eighth and Last
Go back into the Cisco Webex desktop platform. Once it is open, click on the plus button on the top left to the right of the search bar and click on "contact a person". in the search box that appears, you will need to type the email address that you noted down in step one. This will start a new chat with the bot!

![Webex Plus button add a new chat.][webex-add-button]

## Usage

In order to start scoring some people, you need to just type:

```/help```

This will show you the entire list of available things that you can say to the chatbot and it will teach you the rest!

## Exmaples

you can see here this is an example of how the chatbot controller is `listening` with the `hears` method. it is listening for anything that matches that array of strings. The (.*) is a wildcard that can be accessed and used. It is meant as a parameter for the chatbot to require for it to function properly.

as you can see there is a middleware method that is being used so that if the controller `heard` anything that matches, it will go to the middleware function before it reaches the `controller.hears` method. The purpose of this is to format the response based on whatever the person had said. In order to continue in this example we need to set the `message.user_profile` variable with the string that we want to respond with and then call the `next()` function for it to send that message.

```javascript
controller.middleware.heard.use(function(bot, message, next){
    let text = message.text.split(" ");
    let found = false;
    if(text[0] == "/points"){
        // perform the code that adds points to a user
    }else if(text[0] == "/remove"){
        // perform the code to remove a specific user
    }else if(text[0] == "/reset"){
        // perform the code to set the users points to zero
    }else if(text[0] == "/user"){
        // perform the code to add a new user
    }else if(text[0] == "/tally"){
        // perform the code to tally up the results so far.
    }else if(text[0] == "/help"){
        //send the help response
        message.user_profile = "Here is a list of things you can say:\n1. /points '# of points' 'Name of person'\n2. /tally\n3. /remove 'users name'\n4. /user 'new users name'\n5. /reset";
        next();
    }else{
        //send by default the help response
    }
});

controller.hears(['^/points (.*)', '^/remove (.*)', '^/reset', '^/user (.*)', '^/tally', '^/help'], 'direct_message,direct_mention', function(bot, message){
    console.log("Made it to the hears reply section", message.user_profile);
    bot.reply(message, message.user_profile);
});
```

## Pull Requests

If you wish to contribute to this package, please clone the repository and create a pull request. Thank you so much!



[botkit-access-key]: https://worthenwebcom.files.wordpress.com/2018/11/botkit-access-key.png
[Build-A-Bot-Botkit]: https://worthenwebcom.files.wordpress.com/2018/11/build-a-bot-botkit.png
[Cisco-Developer-Create-Bot]: https://worthenwebcom.files.wordpress.com/2018/11/cisco-developer-create-bot.png
[cisco-developer-create-bot-form-with-email]: https://worthenwebcom.files.wordpress.com/2018/11/cisco-developer-create-bot-form-with-email.png
[webex-add-button]: https://worthenwebcom.files.wordpress.com/2018/11/webex-add-button.png
[webex-opening-screen]: https://worthenwebcom.files.wordpress.com/2018/11/webex-opening-screen.png
[heroku-config]: https://worthenwebcom.files.wordpress.com/2018/11/heroku-config-vars.png
[MLab-image]: https://worthenwebcom.files.wordpress.com/2018/11/mlab-image.png