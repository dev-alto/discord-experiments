# 🤖 discord-experiments

Hello! This is a work-in-progress web application that serves as one of my side-projects. 

It currenttly serves to be a personal multi-purpose Discord bot, one — however, that is feature-unique.

## 📚 Command Directory:

### Stable-ish Commands:

Be advised: Currently, all  `/test` prefixed commands interact with the bot's music feature.

`/test` - Requests a new audio track sourced either from a YouTube or Spotify URL link, or an internal soundboard track.

> Input: 
> - [voice-channel] (required) - The voice channel the bot will join. Note that this field becomes unused once the bot is already connected somewhere.
> - [link] (required) - The audio source to extract and play.

`/testvolume` - Changes the audio player volume of the bot.

> Input:
> - [volume] (required) - The number from 0 to 5 to set the audio player volume to. I recommend 0.5.

`/testqueue` - Displays the bot's neat-looking queue in a packaged message.

`/testpause` - Pauses the bot's audio player.

`/snipe` - Fun thing.

> Input:
> - [user-mention] (required) - The tango to snipe.

### Not-As-Stable Commands:

`/testskip` - Skips the current track. 

