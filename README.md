# Twitch Massive BAN Tool

### English:
This is a tool for Twitch mods to ban a lot of people on a lot of channels without doing manually.

## Requirements
To use this tool, you need:
- Node.js and NPM installed on your computer
- a token generated here: https://twitchtokengenerator.com/ with the following permission active:
  - `chat:read`
  - `channel:moderate`

## Windows installation
1. install `node.js` and `npm`: https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows
2. open PowerShell (select the option "Run as Administrator")
3. on PowerShell, enter inside the script folder
4. type `npm install`

## MacOS installation
1. install `node.js` and `npm`: https://www.programsbuzz.com/article/install-node-js-and-npm-mac-os
2. open the terminal (Applications/Utility/Terminal)
3. on PowerShell, enter inside the script folder
4. type `npm install`

## Linux installation
1. installa `node.js` and `npm`: https://linuxconfig.org/how-to-install-node-js-on-linux
2. open the terminal (depends by the distro, usually is home/Accessories/Terminal)
3. on PowerShell, enter inside the script folder
4. type `npm install`

## Configuration
To make this tool works, it's required to edit those files: `config.json` and `banlist.txt`.
Inside `config.json` you have to write:
- Your username
- the access_token generated here: https://twitchtokengenerator.com/
- the list of the channel you're mod in

Inside `banlist.txt` you have to insert the users to ban.
A line, a user banned.

It's required to format the text as it follows:

```
username,reason to ban
```

## Execution
To begin the MASSIVE BAN, just type `npm run ban` in the Terminal, inside the tool folder.
I you want to use a different text file, type `node ban.js -f path/to/file.txt`.

You can also choose the starting index of the list of users to ban, by using the `-i` option: `node ban.js -f path/to/file.txt -i 10`

This is useful when Twitch returns no response, so you don't have to start again from the beginning.

For a brief list of available options, just type `node ban.js -h`

Have fun!

### Italian:
Questo Tool per bannare tantissimi utenti da tantissimi canali senza che tu debba stare a farlo manualmente.

## Prerequisiti
Per poter utilizzare questo tool è necessario avere:
- Node.js e NPM installati sul computer
- Avere un token generato qui: https://twitchtokengenerator.com/ con i seguenti permessi attivi:
  - `chat:read`
  - `channel:moderate`

## Installazione Windows
1. installa `node.js` e `npm`: https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows
2. apri PowerShell (seleziona l'opzione "Esegui come amministratore")
3. da PowerShell, entra nella cartella dello script
4. digita `npm install`

## Installazione MacOS
1. installa `node.js` e `npm`: https://www.nodeacademy.it/installare-node-js-mac-os-x/
2. apri il terminale (Applicazioni/Utility/Terminale)
3. da terminale, entra nella cartella dello script
4. digita `npm install`

## Installazione Linux
Dai zio, fai il serio. Se hai Linux sai già come fare.
Scherzi a parte:
1. installa `node.js` e `npm`: https://linuxconfig.org/how-to-install-node-js-on-linux
2. apri il terminale (dipende dalla distro, ma solitamente è home/Accessori/Terminale)
3. da terminale, entra nella cartella dello script
4. digita `npm install`

## Configurazione
Per far funzionare lo script è necessario editare i file `config.json` e `banlist.txt`.
Dentro `config.json` devi inserire:
- Il tuo username
- l'access_token generato qui: https://twitchtokengenerator.com/
- la lista dei canali che moderi

Dentro `banlist.txt` inserisci la gente che si vuole bannare.
Una riga, un utente bannato.

Le righe devono essere formattate in questo modo:

```
username,reason to ban
```

## Esecuzione
Per iniziare l'opera di Ban Massivo, digitare nel terminale/PowerShell, sempre all'interno della cartella dello script, `npm run ban`.
Se volete usare un altro file, digitate `node ban.js -f percorso/del/file.txt`.

Lo script inizierà a bannare gli utenti su ogni singolo canale inserito nel file `config.json`.
Ci impiega un pò perchè a Twitch non piace quando gli si inviano tante richieste provenienti dallo stesso indirizzo IP allo stesso momento.

È possibile selezionare un punto di inizio della liste degli utenti da bannare con l'opzione `-i`, es. `node ban.js -f path/to/file.txt -i 10`

Questa opzione è utile nel caso Twitch rifiuta di rispondere alla richiesta, in questo modo si evita di ricominciare tutto da capo.

Per una breve lista di opzioni disponibili, basta digitare `node ban.js -h`

Divertitevi!
