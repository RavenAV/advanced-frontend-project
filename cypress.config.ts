import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      //  --config-file cypress/cypress.config.ts
    },
    baseUrl: 'http://localhost:3000/',
  },

  "component": {
    "devServer": {
      "framework": "react",
      "bundler": "webpack"
    }
  }
})

