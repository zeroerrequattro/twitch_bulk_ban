const fs    = require('fs')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const tmi   = require('tmi.js')
const config = require('./config.json')

const argv = yargs(hideBin(process.argv))
            .alias('f','file')
            .nargs('f', 1)
            .describe('f', 'Load a file')
            .demandOption(['f'])
            .help()
            .alias('help','h')
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

const delay = time => new Promise(res => setTimeout(res, time))

console.log('users to ban: %s',file.length)

client.on('connected', async () => {
  let i = 0

  while(channels[i]) {
    console.log('channel: %s',channels[i])
    let j = 0
    while(file[j]) {
      [user,reason] = file[j].split(',')
      
      const time = Math.floor(Math.random()*50)+50
      
      await delay(time)

      await client.ban(channels[i],user,reason)
      .then(data => {
        console.log(j,data,time)
        j += 1
      })
      .catch(async e => {
        console.log(j,e,time)
        if(
          e !== 'already_banned'
          && e !== 'invalid_user'
        ) {
          console.log('retrying after 10 sec...')
          await delay(10000)
        } else {
          j += 1
        }
      })

    }
    i += 1
  }

  process.exit(0)
})

client.connect()
