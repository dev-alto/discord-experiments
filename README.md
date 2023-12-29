# 🤖 discord-experiments

Hello! This is a work-in-progress web application that serves as one of my many side-projects. 

It currenttly serves to be a personal multi-purpose Discord bot, one — however, that is feature-unique.

<img src="https://github.com/dev-alto/dev-alto/blob/main/28%20July%20%40%2012-59-26%20AM.png">

## 📚 Command Directory:

### ✅ Stable-ish Commands:

⚠ **Be advised:** At this point in development, know that all  `a` prefixed commands interact with the bot's audio player feature.

⇒ `/aplay` - Requests a new audio track sourced either from a YouT\*be or Spotify URI link, or an internal soundboard track.

> - [voice-channel] (required) - The voice channel the bot will join. Note that this field is unused if the bot is already connected somewhere.
> - [link] (required) - The audio source to extract and play, either a URL or the name of an internal soundboard track.

⇒ `/avolume` - Changes the bot's internal audio player's global volume(as in the perceived volume for all users).

> - [volume] (required) - A number from 0 to 5 to set the audio player volume to. I recommend 0.50.

⚠ **Be advised:** The audio player's track volume is by default initially set to `0.50` when first connecting to a voice channel. Do note that a perceived sound's "loudness" is not on a linear scale, so this is not "half as loud". This is actually a user experience feature so that music does not by default drown out other voice channel member's voices and otherwise require users to manually lower their own local volume for the bot. Of course, effectiveness varies by each users's audio setup. Set the volume to `1` to return to the "default volume" of the tracks for the player.

⇒ `/aqueue` - Displays the bot's queue in a neat-looking packaged message.

⇒ `/apause` - Pauses the bot's audio player.

⇒ `/askip` - Skips the current track. (Future plans to allow skipping to a specific index in the queue)

⇒ `/snipe` - Fun command; utilizes image manipulation from sharp.

⇒ `/ping` - An internal utility command. Tests the connection and latency between me and Discord's server clusters.

> - [user-mention] (required) - The tango.

### 🔶 Not-As-Stable Commands:

⇒ `/timer` - The bot starts/stops an interal stopwatch timer, starting from the time the command is first used until the command is called again, then returning the delta time in ms. For debugging timing and latency.

### plus some other hidden or experimental commands too 👻

## 🔎 Xtras

<img src="https://github.com/dev-alto/dev-alto/blob/main/03%20August%20%40%2003-06-42%20AM.png">

This message means my bot is offline. Let me know if you want me to re/start it up.
