# Webex Chatbot Score System

this package was created with the intent of teaching how to make integrations into Cisco Webex Chat system. 

### What does this do?
This specific integration will allow you to add a user and add a score to that user and also see all of the users that you have created and their scores.

## Installation

First thing that you need to do is go to [Botkit studio](https://studio.botkit.ai/login) in order to get an access token to use [BotKit](https://botkit.ai/docs/). After you have finished creating a new bot, make sure that you note the email address that you added for the bot because it will be used later on. Once you get an access token, that needs to be placed in the .env file as the access_token.

Second thing that you need to do is go to [M Labd](https://mlab.com/) to create a mongo db for your application. Log in or Sign up. click on "Create New" and go ahead and use the free sandbox plan. Select your loaction. create a database name, and submit your order. Click on the database that shows up in the list of databases. Now click on the users section and create a new user. Now you should see a section that has a bit of text that looks like this "mongodb://<dbuser>:<dbpassword>@ds1111111.mlab.com:11111/<your database name>" make sure to replace the <dbuser> with the name of the user that you just created as well as for the <dbpassword>. Paste that entire string of text into the .env file under mongo_connection.

Third thing that you need to do is install [Heroku](https://devcenter.heroku.com/articles/heroku-cli) on your computer. After installation, go onto your command prompt and navigate to your repository location. Then type "heroku create". It will then generate a public location for your application to be hosted so that Cisco Webex can access it. Place the address that was just created into the public_address field of the .env file.

Fourth thing that you need to do is fill in the remaining field in the .env file. the secret field is any password that you want.

Fifth thing that you need to do is go into your [Heroku Dashboard](https://dashboard.heroku.com/apps) and click on the app that you just created. Go into the settings of the application and click on "Reveal Config Vars" This will be where you need to add each of the fields from the .env file into these locations. Add new fields for each .env line.

Sixth thing that you need to do is go back into the command prompt and type "git push heroku master" this will now upload the app and build it and run it.

Last thing that you need to do is download the Cisco Webex Desktop platform and install and run it. Once it is open, click on the plus button on the top left to the right of the search bar and click on "contact a person". in the search box that appears, you will need to type the email address that you noted down in step one. This will start a new chat with the bot!

## Usage

In order to start scoring some people, you need to just type:

```/help```

This will show you the entire list of available things that you can say to the chatbot and it will teach you the rest!

## Pull Requests

If you wish to contribute to this package, please clone the repository and create a pull request. Thank you so much!