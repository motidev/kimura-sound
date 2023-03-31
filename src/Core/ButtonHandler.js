
async function loadButtons( kimuraClient ) {
    const {loadfiles} = require("../functions/fileLoader");

    const Files = await loadfiles("Buttons");

    Files.forEach((file) => {
        const button = require(file)
        kimuraClient.buttons.set(button.data.name, button)
    })
}

module.exports = { loadButtons };