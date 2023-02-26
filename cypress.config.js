const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    /* eslint-disable */
    setupNodeEvents(on, config) { 
      // implement node event listeners here
      config.env = {
        ...process.env,
        ...config.env,
        localUrl: `http://localhost:${process.env.PORT || 8080}`
        }
      return config
    }
  }
})
