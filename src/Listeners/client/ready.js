const { loadCommands } = require("../../Core/CommandHandler")
const mongoose = require("mongoose");

module.exports ={ 
    name: "ready",
    once: true,
    execute(kimuraClient) {
        console.log(`
        :::    ::: ::::::::::: ::::    ::::  :::    ::: :::::::::      :::     
        :+:   :+:      :+:     +:+:+: :+:+:+ :+:    :+: :+:    :+:   :+: :+:   
        +:+  +:+       +:+     +:+ +:+:+ +:+ +:+    +:+ +:+    +:+  +:+   +:+  
        +#++:++        +#+     +#+  +:+  +#+ +#+    +:+ +#++:++#:  +#++:++#++: 
        +#+  +#+       +#+     +#+       +#+ +#+    +#+ +#+    +#+ +#+     +#+ 
        #+#   #+#      #+#     #+#       #+# #+#    #+# #+#    #+# #+#     #+# 
        ###    ### ########### ###       ###  ########  ###    ### ###     ### 
                                DEVELOPED BY Moti#6503
        `)

        // pressence bot
        kimuraClient.user.setPresence({ activities: [{ name: 'Dextiny Studio', type: 3 }], status: 'online'})

        //loadede commands
        loadCommands(kimuraClient);

        //database
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.mongourl, { 
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(db =>  console.log(`Conexion a la base de datos correcta -> ✅`))
        .catch(err =>  console.log(`${err} Conexion a la base de datos rechazada -> ❌`))
        
        
    }
}