/* eslint no-unreachable: 0 */
const exec = require('child_process').exec
exec('npm -v', (err, stdout, stderr) => {
  if (err) throw err
  if (parseFloat(stdout) < 3) {
    throw new Error('[ERROR: React Redux Boilerplate] You need npm version @>=3')
    process.exit(1)
  }
})
