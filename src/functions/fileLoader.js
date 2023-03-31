const { glob } = require("glob");
const { promisify } = require("util");
const proGlob = promisify(glob);

async function loadfiles(dirname) {
    const Files = await proGlob(`${process.cwd().replace(/\\/g, "/")}/src/${dirname}/**/*.js`);
    Files.forEach((file) => {delete require.cache[require.resolve(file)]});
    return Files;
}

module.exports = { loadfiles }