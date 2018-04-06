const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');
const url = "https://cdn.discordapp.com/attachments/431108891149860864/431536219780939776/597f2be4a883967b9ab70087e3f5711a.png"

client.on('guildBanAdd', (guild, user) => {
    user.sendMessage(`**:sunglasses: Olá ${user.username} , você foi banido do Servidor !!!**`)
    guild.channels.get("373139199173328898").sendMessage({
        "embed": {
            "description": "**Usuário banido!**\n\n```Nome: \n" + user.tag + "\n\nID: " + user.id + "```",
            "color": 65535,
            "footer": {
                "icon_url": user.displayAvatarURL,
                "text": user.username
            },
            "thumbnail": {
                "url": user.displayAvatarURL
            }
        }
    });
});

client.on('guildBanRemove', (guild, user) => {
    user.sendMessage(`**:sunglasses: Olá ${user.username} , você foi desbanido do !!! :open_mouth: **`)
    guild.channels.get("373139199173328898").sendMessage({
        "embed": {
            "description": "**Usuário desbanido!**\n\n```Nome: " + user.tag + "\n\nID: " + user.id + "```",
            "color": 65535,
            "footer": {
                "icon_url": user.displayAvatarURL,
                "text": user.username
            },
            "thumbnail": {
                "url": user.displayAvatarURL
            }
        }
    });
});

client.on('messageDelete', (message) => {
    if (message.author.bot) return;
    if (message.author.id == "371353272818335744") return ;
    if (message.channel.id == client.guilds.get("334474502262095872").channels.get("373135816819474435").id) return; // Lobby

    client.guilds.get("334474502262095872").channels.get("373139156693549066").sendMessage({
        "embed": {
            "description": "**Mensagem deletada!**\n\nAuthor da mensagem: " + message.author.tag + " \n\nMensagem: " + message + " \n\n",
            "color": 65535,
            "footer": {
                "icon_url": message.author.displayAvatarURL,
                "text": message.author.username
            },
            "thumbnail": {
                "url": message.author.displayAvatarURL
            }
        }
    })
});
client.on('emojiCreate', (emoji) => {
    
        client.guilds.get("334474502262095872").channels.get("373139173277696010").sendMessage({
            "embed": {
                "description": "**:fire: Emoji Criado:**\n\n```\nNome: " + emoji.name + "\n\nID: " + emoji.id + "```",
                "color": 11807355,
                "thumbnail": {
                    "url": url
                }
            }
        });
    });
client.on('emojiDelete', (emoji) => {
    
        client.guilds.get("334474502262095872").channels.get("373139173277696010").sendMessage({
            "embed": {
                "description": "**:fire: Emoji Deletado:**\n\n```\nNome: " + emoji.name + "\n\nID: " + emoji.id + "```",
                "color": 11807355,
                "thumbnail": {
                    "url": url
                }
            }
        });
    });

client.on('roleCreate', (role) => {

    client.guilds.get("334474502262095872").channels.get("373139173277696010").sendMessage({
        "embed": {
            "description": "**:fire: Cargo criado:**\n\n```\nNome: " + role.name + "\n\nID: " + role.id + "```",
            "color": 11807355,
            "thumbnail": {
                "url": url
            }
        }
    });
});

client.on('roleDelete', (role) => {

    client.guilds.get("334474502262095872").channels.get("373139173277696010").sendMessage({
        "embed": {
            "description": "**:fire: Cargo deletado:**\n\n```\nNome: " + role.name + "\n\nID: " + role.id + "```",
            "color": 11807355,
            "thumbnail": {
                "url": url
            }
        }
    });
});

//Permições de Comandos nas Pastas
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      let eventFunction = require(`./events/${file}`);
      let eventName = file.split(".")[0];
  client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
  });

client.on("message", message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    if(message.guild.members.get(message.author.id).roles.get("334474502262095872")){
    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);
   
    let args = message.content.split(" ").slice(1);
    //Comandos Para todos = )
   
    try {
      let commandFile = require(`./comandos/${command}.js`);
      commandFile.run(client, message, args);
    } catch (err) {
      console.error(err);
    }
}
  });
    
function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  };
  
  client.on("message", message => {
    const args = message.content.split(" ").slice(1);
    if (message.content.startsWith(config.prefix + "eval")) {
        if (message.author.id !== "271028101012520961") return;
        try {
            const code = args.join(" ");
            let evaled = eval(code);
            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);
            message.channel.send(clean(evaled), { code: "xl" });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
});

//Comandos de Setar Cores
 client.on("message", (message) => {
    if (message.author.bot) return;
    if (message.channel.type !== 'text') return;
    if ( message.guild.id != 334474502262095872 ) return ;
    if ( message.channel.id != 372161054203052033 ) return ;

    if (message.content.startsWith(".setcor azul4")) {
    //Colors
        client.guilds.get("334474502262095872").members.get(message.author.id).addRole("358052325711020043"); // Azul 4
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("368267849028075522"); // Azul 3
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358048264471314454"); // Azul 2
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046517455749120"); // Azul 1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051061958967300"); // Verde
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051158226501632"); // Rosa
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051319212408832"); // Preto
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("373675890917507083"); // Branco
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046299075117056"); // Roxo
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046403198451713"); // Vermelho
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("365913017012977664"); // Amarelo1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("363042250525114368"); // Amarelo2
        message.reply("** Cor Setada <3**")
    }
    if (message.content.startsWith(".setcor azul3")) {
    //Colors
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358052325711020043"); // Azul 4
        client.guilds.get("334474502262095872").members.get(message.author.id).addRole("368267849028075522"); // Azul 3
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358048264471314454"); // Azul 2
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046517455749120"); // Azul 1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051061958967300"); // Verde
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051158226501632"); // Rosa
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051319212408832"); // Preto
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("373675890917507083"); // Branco
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046299075117056"); // Roxo
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046403198451713"); // Vermelho
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("365913017012977664"); // Amarelo1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("363042250525114368"); // Amarelo2
        message.reply("** Cor Setada <3**")
    }
    if (message.content.startsWith(".setcor azul2")) {
    //Colors
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358052325711020043"); // Azul 4
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("368267849028075522"); // Azul 3
        client.guilds.get("334474502262095872").members.get(message.author.id).addRole("358048264471314454"); // Azul 2
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046517455749120"); // Azul 1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051061958967300"); // Verde
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051158226501632"); // Rosa
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051319212408832"); // Preto
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("373675890917507083"); // Branco
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046299075117056"); // Roxo
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046403198451713"); // Vermelho
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("365913017012977664"); // Amarelo1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("363042250525114368"); // Amarelo2
        message.reply("** Cor Setada <3**")
    }
    if (message.content.startsWith(".setcor azul1")) {
    //Colors
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358052325711020043"); // Azul 4
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("368267849028075522"); // Azul 3
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358048264471314454"); // Azul 2
        client.guilds.get("334474502262095872").members.get(message.author.id).addRole("358046517455749120"); // Azul 1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051061958967300"); // Verde
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051158226501632"); // Rosa
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051319212408832"); // Preto
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("373675890917507083"); // Branco
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046299075117056"); // Roxo
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046403198451713"); // Vermelho
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("365913017012977664"); // Amarelo1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("363042250525114368"); // Amarelo2
        message.reply("** Cor Setada <3**")
    }
    if (message.content.startsWith(".setcor verde")) {
    //Colors
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358052325711020043"); // Azul 4
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("368267849028075522"); // Azul 3
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358048264471314454"); // Azul 2
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046517455749120"); // Azul 1
        client.guilds.get("334474502262095872").members.get(message.author.id).addRole("358051061958967300"); // Verde
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051158226501632"); // Rosa
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051319212408832"); // Preto
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("373675890917507083"); // Branco
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046299075117056"); // Roxo
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046403198451713"); // Vermelho
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("365913017012977664"); // Amarelo1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("363042250525114368"); // Amarelo2
        message.reply("** Cor Setada <3**")
    }
    if (message.content.startsWith(".setcor rosa")) {
    //Colors
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358052325711020043"); // Azul 4
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("368267849028075522"); // Azul 3
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358048264471314454"); // Azul 2
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046517455749120"); // Azul 1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051061958967300"); // Verde
        client.guilds.get("334474502262095872").members.get(message.author.id).addRole("358051158226501632"); // Rosa
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051319212408832"); // Preto
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("373675890917507083"); // Branco
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046299075117056"); // Roxo
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046403198451713"); // Vermelho
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("365913017012977664"); // Amarelo1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("363042250525114368"); // Amarelo2
        message.reply("** Cor Setada <3**")
    }
    if (message.content.startsWith(".setcor preto")) {
    //Colors
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358052325711020043"); // Azul 4
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("368267849028075522"); // Azul 3
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358048264471314454"); // Azul 2
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046517455749120"); // Azul 1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051061958967300"); // Verde
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051158226501632"); // Rosa
        client.guilds.get("334474502262095872").members.get(message.author.id).addRole("358051319212408832"); // Preto
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("373675890917507083"); // Branco
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046299075117056"); // Roxo
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046403198451713"); // Vermelho
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("365913017012977664"); // Amarelo1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("363042250525114368"); // Amarelo2
        message.reply("** Cor Setada <3**")
    }
    if (message.content.startsWith(".setcor branco")) {
    //Colors
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358052325711020043"); // Azul 4
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("368267849028075522"); // Azul 3
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358048264471314454"); // Azul 2
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046517455749120"); // Azul 1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051061958967300"); // Verde
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051158226501632"); // Rosa
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051319212408832"); // Preto
        client.guilds.get("334474502262095872").members.get(message.author.id).addRole("373675890917507083"); // Branco
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046299075117056"); // Roxo
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046403198451713"); // Vermelho
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("365913017012977664"); // Amarelo1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("363042250525114368"); // Amarelo2
        message.reply("** Cor Setada <3**")
    }
    if (message.content.startsWith(".setcor roxo")) {
    //Colors
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358052325711020043"); // Azul 4
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("368267849028075522"); // Azul 3
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358048264471314454"); // Azul 2
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046517455749120"); // Azul 1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051061958967300"); // Verde
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051158226501632"); // Rosa
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051319212408832"); // Preto
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("373675890917507083"); // Branco
        client.guilds.get("334474502262095872").members.get(message.author.id).addRole("358046299075117056"); // Roxo
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046403198451713"); // Vermelho
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("365913017012977664"); // Amarelo1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("363042250525114368"); // Amarelo2
        message.reply("** Cor Setada <3**")
    }
    if (message.content.startsWith(".setcor vermelho")) {
    //Colors
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358052325711020043"); // Azul 4
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("368267849028075522"); // Azul 3
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358048264471314454"); // Azul 2
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046517455749120"); // Azul 1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051061958967300"); // Verde
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051158226501632"); // Rosa
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051319212408832"); // Preto
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("373675890917507083"); // Branco
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046299075117056"); // Roxo
        client.guilds.get("334474502262095872").members.get(message.author.id).addRole("358046403198451713"); // Vermelho
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("365913017012977664"); // Amarelo1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("363042250525114368"); // Amarelo2
        message.reply("** Cor Setada <3**")
    }
    if (message.content.startsWith(".setcor amarelo1")) {
    //Colors
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358052325711020043"); // Azul 4
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("368267849028075522"); // Azul 3
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358048264471314454"); // Azul 2
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046517455749120"); // Azul 1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051061958967300"); // Verde
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051158226501632"); // Rosa
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051319212408832"); // Preto
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("373675890917507083"); // Branco
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046299075117056"); // Roxo
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046403198451713"); // Vermelho
        client.guilds.get("334474502262095872").members.get(message.author.id).addRole("365913017012977664"); // Amarelo1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("363042250525114368"); // Amarelo2
        message.reply("** Cor Setada <3**")
    }
    if (message.content.startsWith(".setcor amarelo2")) {
    //Colors
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358052325711020043"); // Azul 4
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("368267849028075522"); // Azul 3
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358048264471314454"); // Azul 2
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046517455749120"); // Azul 1
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051061958967300"); // Verde
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051158226501632"); // Rosa
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358051319212408832"); // Preto
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("373675890917507083"); // Branco
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046299075117056"); // Roxo
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("358046403198451713"); // Vermelho
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("365913017012977664"); // Amarelo1
        client.guilds.get("334474502262095872").members.get(message.author.id).addRole("363042250525114368"); // Amarelo2
        message.reply("** Cor Setada <3**")
    }
});

//Comandos  Normais
  client.on("message", (message) => {
    if (message.author.bot) return;
    if (message.channel.type !== 'text') return;
   
    const user = message.mentions.users.first() || message.author;

    if (message.content.startsWith(config.prefix + "clear 0")) {
        message.channel.startTyping();
        setTimeout(function() {
        message.channel.sendMessage("```Voce Pediu Para limpar 0, 0 nao e quantidade, nisso limpei tudo, Me Desculpe ;-;```")
        message.channel.stopTyping();
      }, 3000)
      }

      if (message.content.startsWith(config.prefix + "rmvwarn")) {
        if(message.guild.members.get(message.author.id).roles.get("373141815630757889")){
            message.channel.sendMessage("<@" +message.mentions.users.first().id + ">** Teve os Avisos Removidos**")
            client.guilds.get("334474502262095872").members.get(message.mentions.users.first().id).removeRole("373143389018914817"); // 1/3
            client.guilds.get("334474502262095872").members.get(message.mentions.users.first().id).removeRole("373143394622636032"); // 2/3
            client.guilds.get("334474502262095872").members.get(message.mentions.users.first().id).removeRole("373143399597080587"); // 3/3
        }
      }

      if (message.content.startsWith(config.prefix)) {
        message.delete();
      }

      if (message.content.startsWith(".nsfw")) {
        client.guilds.get("334474502262095872").members.get(message.author.id).addRole("373154065586323466");
        message.delete();
      }

      if (message.content.startsWith(".nsfw leave")) {
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("373154065586323466");
        message.delete();
      }
      if (message.content.startsWith(".ghoul")) {
        if ( message.guild.id != 334474502262095872 ) return ;
        if ( message.channel.id != 373135816819474435 ) return ;
        message.author.sendMessage(":flag_br: ** Olá Seja Bem Vindo. Ao Servidor :smiley:**")
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("373164991005851648");
        client.guilds.get("334474502262095872").members.get(message.author.id).removeRole("373164991005851648");
        message.delete();
      }

    });


bot.login('');
