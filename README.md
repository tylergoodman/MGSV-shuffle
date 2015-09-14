# MSGV-suffle

'shuffles' your MGSV helicopter music by copying a random file in a given folder over the file that MGSV reads from to play in your helicopter

#### Usage
MSGV-suffle PATH_TO_FILE PATH_TO_MUSIC_FOLDER [INTERVAL]

- PATH_TO_FILE - the (absolute) name of the file that you previously told MGSV to play
- PATH_TO_MUSIC_FOLDER - the (absolute) name of the folder that contains the music files you want to be shuffled in
  - will probably break if something other than a music file is shuffled in, keep this folder clear of anything else
- INTERVAL - optional time between shuffling in milliseconds, minimum 30,000
