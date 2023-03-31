const { wssend} = require("../functions/ws-send")

async function loadCommands(kimuraClient) {
    const {loadfiles} = require("../functions/fileLoader");

    await kimuraClient.commands.clear();

    const Files = await loadfiles("Commands");

    let commandsArray= [];

    Files.forEach((file) => {
        const command = require(file);

        kimuraClient.commands.set(command.data.name, command);

        commandsArray.push(command.data.toJSON());

        console.log(`[TRACE] Commands (${command.data.name}) loaded `);
        wssend(process.env.keysystem, `💻 [TRACE] Commands (${command.data.name}) loaded `);
    })

    kimuraClient.application.commands.set(commandsArray)
    
}


module.exports = { loadCommands };