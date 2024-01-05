# 🤖 discord-experiments

Hello! This is a work-in-progress web application that serves as one of my many side-projects. 

It currently serves to be a personal multi-purpose Discord bot, one — however, that is feature-unique.

<img src="https://github.com/dev-alto/dev-alto/blob/main/28%20July%20%40%2012-59-26%20AM.png">

## 📚 Command Directory:

### ✅ Stable-ish Commands:

⇒ `/aplay` - Enqueues a new audio track sourced either from a YouT\*be or Spotify URI link, or an internal soundboard track.

> - [link] (required) - A URI for the audio source to extract from and play.
> - [index] (optional) - A number spot in the queue to add the audio track to.
> - [voice-channel] (optional) - The voice channel the bot will join. If not provided, the bot will automagically join or wait to follow the user into a voice channel.

⇒ `/avolume` - Adjusts the bot's internal audio player's global volume (as in the perceived volume for all connected users¹).

> - [volume] (required) - A decimal number to set the audio player volume to. I recommend 0.2 to 0.8. The range is unbounded, but values above 1 may cause distortion.

⇒ `/aqueue` - Displays the bot's queue in a neat-looking packaged message.

⇒ `/apause` - Pauses and unpauses the bot's audio player.

⇒ `/askip` - Skips the current track. (Future plans to allow skipping to a specific index in the queue)

⇒ `/auploadsb` - An internal utility command. Allows the addition and upload of `.mp3`s to the bot's internal soundboard.

> - [file-attachment] (required) - The `.mp3` file to upload.

⇒ `/snipe` - Fun command; utilizes image manipulation from sharp.

> - [user-mention] (required) - The user tango.

⇒ `/ping` - An internal utility command. Tests the connection and latency between me and Discord's server clusters.

⇒ `/help` - Provides a guide manual(probably to the one you're looking at).

### 🔶 Not-As-Stable or Special Commands:

⇒ `/timer` - The bot starts/stops an interal stopwatch timer, starting from the time the command is first used until the command is called again, then returning the delta time in ms. For debugging timing and latency.

⇒ `/toggledebug` - Enables/disables command response messages and performance timings. This value is saved internally.

⇒ `/generatereport` - Neatly displays the bot's current node module and @discord.js/voice dependencies. Also packaged with other miscellaneous uptime technical info.

### plus some other hidden or experimental commands too 👻

## 🔎 Xtras

<img src="https://github.com/dev-alto/dev-alto/blob/main/03%20August%20%40%2003-06-42%20AM.png">

This message means my bot is offline. Let me know if you want me to re/start it up.

💁‍♂️ **¹** The audio player's track volume is by default initially set to `0.20` when first connecting to a voice channel. Do note that a sound's perceived "loudness" is not on a linear scale, so this is not "a fifth as loud". This actually serves as a user experience feature so that music does not by default drown out other voice channel member's voices and otherwise require users to manually lower their own local volume for the bot. Of course, effectiveness varies by each users's audio setup. Set the volume to `1` to return to the "default volume" of the tracks for the player.
