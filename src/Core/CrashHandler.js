const { wssend } = require("../functions/ws-send");

module.exports = kimuraClient => {
    kimuraClient.on("error", (err) => {
        console.log(err);
        wssend(process.env.errorkey , `💻 [TRACE] :: unhandledRejection ${err}`);
    })
    process.on("unhandledRejection", (e) => {
        console.log('💻 [TRACE] :: unhandledRejection ');
        console.log(e);
        wssend(process.env.errorkey , `💻 [TRACE] :: unhandledRejection ${e}`);
    });
    process.on("uncaughtException", (err, origin) => {
        console.log('💻 [TRACE] :: uncaughtException ');
        console.log(err, origin);
        wssend(process.env.errorkey , `💻 [TRACE] :: uncaughtException ${err} ${origin}`);
     });
     process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log('💻 [TRACE] ::uncaughtExceptionMonitor ');
        console.log(err, origin);
        wssend(process.env.errorkey , `💻 [TRACE] :: uncaughtExceptionMonitor ${err} ${origin}`);
     });
 }


 



