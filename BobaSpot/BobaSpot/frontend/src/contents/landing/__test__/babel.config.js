module.exports = {
  overrides: [
      {
          test: 'platforms/webApp1',
          extends: 'platforms/webApp1/babel.config.js'
      },
      {
          test: 'platforms/webApp2',
          extends: 'platforms/webApp2/babel.config.js'
      }
  ]
};