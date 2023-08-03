# 🤖 discord-experiments

Hello! This is a work-in-progress web application that serves as one of my side-projects. 

It currenttly serves to be a personal multi-purpose Discord bot, one — however, that is feature-unique.

<img src="https://github.com/dev-alto/dev-alto/blob/main/28%20July%20%40%2012-59-26%20AM.png">

## 📚 Command Directory:

### Stable-ish Commands:

⚠ Be advised: Currently, all  `/test` prefixed commands interact with the bot's music feature.

`/test` - Requests a new audio track sourced either from a YouT\*be or Spotify URL link, or an internal soundboard track.

> Input: 
> - [voice-channel] (required) - The voice channel the bot will join. Note that this field becomes unused once the bot is already connected somewhere.
> - [link] (required) - The audio source to extract and play.

`/testvolume` - Changes the audio player volume of the bot.

> Input:
> - [volume] (required) - The number from 0 to 5 to set the audio player volume to. I recommend 0.5.

`/testqueue` - Displays the bot's queue in a neat-looking packaged message.

`/testpause` - Pauses the bot's audio player.

`/snipe` - Fun thing.

> Input:
> - [user-mention] (required) - The tango to snipe.

### Not-As-Stable Commands:

`/testskip` - Skips the current track. 

`/timer` - Starts/stops an interally tracked timer, starting from the time the command is first used until the command is used again. Returns the delta time in ms.

\+ some hidden commands too 👻

## 🔎 Xtras

<img src="https://github.com/dev-alto/dev-alto/blob/main/03%20August%20%40%2003-06-42%20AM.png">

This message means my bot is offline. Let me know if you want me to re/start it up.
