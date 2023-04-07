const { SpotifyPlugin } = require('@distube/spotify')
const Distube = require('distube')
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { DeezerPlugin } = require('@distube/deezer');
const fs = require('fs');
const path = require('path');

async function loadMusic(kimuraClient) {
   const distube = new Distube.default(kimuraClient, {
        searchSongs: 0,
        emitNewSongOnly: false,
        searchCooldown: 4,
        leaveOnEmpty: true,
        emptyCooldown: 10,
        leaveOnFinish: true,
        leaveOnStop: false,
        nsfw: true,
        emitAddListWhenCreatingQueue: true,
        emitAddSongWhenCreatingQueue: false,
        plugins:[
            new SpotifyPlugin({
                parallel: true,
                emitEventsAfterFetching: false,
                api: {
                  clientId: process.env.spotifyclientid,
                  clientSecret: process.env.spotifytoken,
                },
            }),
            new SoundCloudPlugin(),
            new DeezerPlugin()
        ]
    })

    kimuraClient.distube = distube;
    

    
    const dirPath = path.join(__dirname, '..', 'MusicListener');
    if (!fs.existsSync(dirPath)) {
      console.error(`Directory ${dirPath} not found`);
    } else {
      const archivo = fs.readdirSync(dirPath);
      for (const file of archivo) {
        if (file.endsWith('js')) {
          let fileName = file.substring(0, file.length - 3)
          let fileContents = require(path.join(dirPath, file))
          kimuraClient.distube.on(fileName, fileContents.bind(null, kimuraClient))
        }
      }
    }


}

module.exports = { loadMusic }