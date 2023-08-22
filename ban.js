const fs    = require('fs')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const tmi   = require('tmi.js')
const { StaticAuthProvider } = require('@twurple/auth')
const { ApiClient } = require('@twurple/api')
const config = require('./config.json')
const { now } = require('./utils')
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

const { channels, username, client_id, access_token } = config

const authProvider = new StaticAuthProvider(client_id, access_token)

const main = async () => {
  const client = new ApiClient({ authProvider })
  const moderator = await client.users.getUserByName(username)

  console.log('users to ban: %s',file.length)

  let i = argv.index || 0

  while(file[i]) {
    try {
      [usernameToBan,reason] = file[i].split(',')
      const userToBan = await client.users.getUserByName(usernameToBan)
      
      if(userToBan === null) {
        throw new Error('user not found')
      }

      console.log('--------------------')
      console.log(i,`- user: ${usernameToBan}, ${userToBan.id}`)
      console.log('--------------------')
    
      let j = 0
      let isValid = false
      while(channels[j]) {

        try {
          const broadcaster = await client.users.getUserByName(channels[j])

          const ban = await client.moderation.banUser(
            broadcaster,
            moderator,
            {
              duration: null,
              user: userToBan,
              reason,
            }
          )
          isValid = true
          console.log(`${channels[j]} - ✅`)
        } catch ({ _body }) {
          const { message } = JSON.parse(_body)
          console.log(`${channels[j]} - ${message}`)

          if( message.includes('already banned') ) {
            isValid = true
          }
        } finally {
          j += 1
        }
      }

      if(isValid && argv.write) {
        fs.appendFileSync(validFile,`${user},${reason}\n`)
      }
    } catch (error) {
      console.error(error)
    } finally {
      i += 1
    }
  }

  process.exit(0)
}

main()
