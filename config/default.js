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

    },

    session : { // openssl rand -base64 50
      secret : 'E69EjH/F5F77QDSv8rRZfCtOGhgTaYRGsB3B3dQy0skUTq5nG1PECJ9bCx/0zg5AABI=',
      resave: true,
      saveUninitialized: true
    }
  },

  // Authomator API client configuration
  AuthomatorNodeClient: {

    // URL of authomator-api instance to communicate with
    api: "http://127.0.0.1:3001"

  },

  // Logger configuration
  logger: {

    // combined | common | dev | short | tiny
    format: 'combined'
  }

};
