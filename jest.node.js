// eslint-disable-next-line @typescript-eslint/no-var-requires
const common = require(`${__dirname}/jest.common.js`)

module.exports = {
  ...common,
  testEnvironment: 'node',
}
