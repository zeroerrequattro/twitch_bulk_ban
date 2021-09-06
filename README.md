# Massive BAN Tool

### Italian:
Tool per bannare tantissimi utenti da tantissimi canali senza che tu debba stare a farlo manualmente.

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
è necessario inserire prima lo username del bannato e poi la ragione del ban.
I due valori devono essere separate dalla virgola (Va da sè che la virgola non può essere usata nel testo della ragione del ban).
Puoi usare anche altri file di testo, basta che siano formattati allo stesso modo.

## Esecuzione
Per iniziare l'opera di Ban Massivo, digitare nel terminale/PowerShell, sempre all'interno della cartella dello script, `npm run ban`.
Se vi sentite degli hacker potete invece digitare `node ban.js -f banlist.txt`, tanto è uguale.

Lo script inizierà a bannare gli utenti su ogni singolo canale inserito nel file `config.json`.
Ci impiega un pò perchè a Twitch non piace quando gli si inviano tante richieste provenienti dallo stesso indirizzo IP allo stesso momento.

Divertitevi!
