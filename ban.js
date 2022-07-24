const fs    = require('fs')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const tmi   = require('tmi.js')
const config = require('./config.json')
const { delay, now } = require('./utils')
const [year, month, day, hour, minutes] = now()
const validFile = `banlist_${year}${month}${day}_${hour}${minutes}.txt`

const argv = yargs(hideBin(process.argv))
            .alias('f','file')
            .nargs('f', 1)
            .describe('f', 'Load a file')
            .alias('i','index')
            .nargs('i', 1)
            .describe('i', 'Starting user index')
            .alias('w','write')
            .nargs('w', 0)
            .describe('w', 'Write banned users in a separate file')
            .demandOption(['f'])
            .help()
            .alias('help','h')
            .alias('version','v')
            .argv

if(!argv.file) {
  console.error('ERROR - no file selected')
  process.exit(1)
}

const file  = fs.readFileSync(argv.file, 'utf-8').split('\n')

const channels = config.channels

const client = tmi.Client({
  connection: {
    reconnect: true
  },
  channels: channels,
  identity: {
    username: config.username,
    password: config.access_token,
  }
})

console.log('users to ban: %s',file.length)

client.on('connected', async () => {
  let i = argv.index || 0

  while(file[i]) {
    [user,reason] = file[i].split(',')
    
    console.log('--------------------')
    console.log(i,`- user: ${user}`)
    console.log('--------------------')
    
    let j = 0
    let isValid = false
    while(channels[j]) {
      
      const time = Math.floor(Math.random()*50)+50
      
      await delay(time)

      await client.ban(channels[j],user,reason)
                  .then(data => {
                    console.log(channels[j],data,`- delay: ${time}ms`)
                    isValid = true
                  })
                  .catch(async e => {
                    console.log(channels[j],e,`- delay: ${time}ms`)
                    if(e === 'already_banned') {
                      isValid = true
                    }
                    
                    if(
                      e !== 'already_banned'
                      && e !== 'invalid_user'
                    ) {
                      process.exit(1)
                    }
                  })
                  .finally(() => {
                    j += 1
                  })
    }

    if(isValid && argv.write) {
      fs.appendFileSync(validFile,`${user},${reason}\n`)
    }
    
    i += 1
  }

  process.exit(0)
})

client.connect()
