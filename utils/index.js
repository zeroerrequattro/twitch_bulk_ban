const pad = int => (int > 9) ? int : `0${int}`

const delay = time => new Promise(res => setTimeout(res,time))

const now = () => {
  const date = new Date()
  return [
    date.getFullYear(),
    pad(date.getMonth()),
    pad(date.getDate()),
    pad(date.getHours()),
    pad(date.getMinutes())
  ]
}

module.exports = {
  pad,
  delay,
  now
}
