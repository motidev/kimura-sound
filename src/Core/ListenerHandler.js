const { wssend } = require("../functions/ws-send")

async function loadListeners( kimuraClient ) {
    const {loadfiles} = require("../functions/fileLoader");

    await kimuraClient.events.clear();

    const Files = await loadfiles("Listeners")

    Files.forEach((file) => { 
        const event = require(file);
  
        const execute = (...args) => event.execute(...args, kimuraClient);
        kimuraClient.events.set(event.name, execute);

        if(event.rest) {
            if(event.once) {
                kimuraClient.rest.once(event.name, execute);
            } else {
                kimuraClient.rest.on(event.name, execute);
            }
        } else {
            if(event.once) {
                kimuraClient.once(event.name, execute);
            } else {
                kimuraClient.on(event.name, execute);
            }
        }

        console.log(`[TRACE] Listener (${event.name}) loaded `);
        wssend(process.env.keysystem, `💻 [TRACE] Listener (${event.name}) loaded `);
    })
} 

module.exports = { loadListeners };