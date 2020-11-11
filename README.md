<div align="center">

![](/assets/banner.png)

[Installation](#Installation) • [How to Use](#How-to-Use)

---

## Installation

</div>

##### Prerequisite

- To use this bot, Node.js 12.0.0 or newer must be [installed](https://nodejs.org/en/download/).

##### Downloading and installing steps

1.  **[Download](https://github.com/jay1934/Text-Channels/archive/main.zip)** the `zip` file.

2.  Configure the Bot:

    - Run `npm i`
    - You will need to [create a bot application](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) in the **[developers space](https://discordapp.com/developers/applications/me)**
    - Replace the placeholders in [`config.json`](/config.json) with your preferred settings and your token (there are already example values in there, but the token and chnanel ID are invalid, so make sure to change it).

3.  Invite the Bot to your Server:

    - In your bot's application page, navigate to [OAUTH2](https://discord.com/developers/applications/771430839250059274/oauth2)
    - In the "scopes" section, select `bot`
    - In the "bot permission" section, select:

      - `ADMINISTRATOR`

    - Copy and paste the generated invite link!

4.  Get the Bot Online
    - Run `node index.js`
    - **The bot is now operational ! 🎉**

<br>

---

<div align="center">

## How to Use

</div>

Whenever somebody chats in the channel specified in [`config.json`](/config.json#L2), the channel will be locked until there is no activity spotted for the amount of time specified in [`config.json`](/config.json#L3) (I've currently set it to five minutes, but you can change it if needed).

<br>

The channel will be unlocked until the next person chats in it, and the cycle repeats. You can also see the status of the channel from the channel _name_ at any given time. If it is unlocked, it will show a 🔓. Otherwise, it will show 🔒.

<br>

**Note:** Make sure the default permissions for the specified channel are as shown:

1. @everyone
   - `READ_MESSAGES`: true
   - `SEND_MESSAGES`: true
2. Bot user or role
   - `READ_MESSAGES`: true
