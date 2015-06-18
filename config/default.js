module.exports = {

  // Port to let the server listen on
  port: 3000,

  // Express application configuration
  app: {

    // Local variables to expose in templates
    locals: {

      // Bundle all variables in a globally available 'app' variable
      // for better namespacing
      app: {

        // Web application title
        title: 'Authomator Web UI',

        // Prefix for links in jade templates
        baseUrl: ''

      }

    }
  },

  // Authomator configuration
  authomator: {

    // URL of authomator instance to communicate with
    url: 'http://default.authomator.com'
  },

  // Logger configuration
  logger: {

    // combined | common | dev | short | tiny
    format: 'combined'
  }

};
