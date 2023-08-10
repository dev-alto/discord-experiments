# 🤖 discord-experiments

Hello! This is a work-in-progress web application that serves as one of my many side-projects. 

It currenttly serves to be a personal multi-purpose Discord bot, one — however, that is feature-unique.

<img src="https://github.com/dev-alto/dev-alto/blob/main/28%20July%20%40%2012-59-26%20AM.png">

## 📚 Command Directory:

### ✅ Stable-ish Commands:

⚠ Be advised: At this point in development, all  `/test` prefixed commands interact with the bot's audio player feature.

⇒ `/test` - Requests a new audio track sourced either from a YouT\*be or Spotify URL link, or an internal soundboard track.

> - [voice-channel] (required) - The voice channel the bot will join. Note that this field is unused if the bot is already connected somewhere.
> - [link] (required) - The audio source to extract and play, either a URL or the name of an internal soundboard track.

⇒ `/testvolume` - Changes the audio player volume of the bot.

> - [volume] (required) - A number from 0 to 5 to set the audio player volume to. I recommend 0.5.

⇒ `/testqueue` - Displays the bot's queue in a neat-looking packaged message.

⇒ `/testpause` - Pauses the bot's audio player.

⇒ `/snipe` - Fun command; utilizes image manipulation tech.

> - [user-mention] (required) - The tango.

### 🔶 Not-As-Stable Commands:

⇒ `/testskip` - Skips the current track. (Future plans to allow skipping to a specific index in the queue)

⇒ `/timer` - The bot starts/stops an interal stopwatch timer, starting from the time the command is first used until the command is called again, then returning the delta time in ms. For debugging.

### plus some other hidden commands too 👻

## 🔎 Xtras

<img src="https://github.com/dev-alto/dev-alto/blob/main/03%20August%20%40%2003-06-42%20AM.png">

This message means my bot is offline. Let me know if you want me to re/start it up.
