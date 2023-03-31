async function loadSelect ( kimuraClient ) {
    const {loadfiles} = require("../functions/fileLoader");

    const Files = await loadfiles("SelectMenus");

    Files.forEach((file) =>{
        const selectmenu = require(file)
        kimuraClient.selectMenus.set(selectmenu.data.name, selectmenu)
    })
}


module.exports = { loadSelect };