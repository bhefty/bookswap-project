/* eslint-disable no-console */

const chalk = require('chalk')
const ip = require('ip')

const divider = chalk.gray('\n-----------------------------------')

/**
 * Logger middleware
 */
const logger = {
  // Called when there's an error on the server
  error: (err) => {
    console.error(chalk.red(err))
  },

  // Called when express.js app starts on given port without errors
  appStarted: (port, host, tunnelStarted) => {
    console.log(`Server started! ${chalk.green('✓')}`)

    // If the tunnel started, log that and the URL it's located at
    if (tunnelStarted) {
      console.log(`Tunnel initialized ${chalk.green('✓')}`)
    }

    console.log(`
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://${host}:${port}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`) +
(tunnelStarted ? `\n    Proxy: ${chalk.magenta(tunnelStarted)}` : '')}${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `)
  }
}

module.exports = logger
