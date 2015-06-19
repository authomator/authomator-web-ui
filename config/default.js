/************************************************************************
 *                                                                      *
 * Authomator-web-ui configuration                                      *
 *                                                                      *
 * This file holds all the configuration options to run the web ui      *
 * component of authomator.                                             *
 *                                                                      *
 * The settings can be adjusted using environment variables or          *
 * commandline switches as documented on:                               *
 *    https://github.com/lorenwest/node-config                          *
 *                                                                      *
 ************************************************************************/

module.exports = {

  /************************************************************************
   *                                                                      *
   * Port for the express server to listen on                             *
   *                                                                      *
   ************************************************************************/
  port: 3000,


  /************************************************************************
   *                                                                      *
   * Express web-ui app configuration                                     *
   *                                                                      *
   ************************************************************************/
  webUi: {

    locals: {

      app: {

        /************************************************************************
         *                                                                      *
         * Title displayed on all pages on                                      *
         *                                                                      *
         * Adjust this to the title of your liking                              *
         *                                                                      *
         ************************************************************************/
        title: 'Authomator Web UI',


        /************************************************************************
         *                                                                      *
         * Base url used in the jade templates                                  *
         *                                                                      *
         * default: ''                                                          *
         *                                                                      *
         * Unless you are mounting the web-ui app somewhere else this variable  *
         * should not be changed                                                *
         ************************************************************************/
        baseUrl: ''

      }

    },

    /************************************************************************
     *                                                                      *
     * Sessions settings (client-sessions)                                   *
     *                                                                      *
     * All options inside this object are fed into the client-session       *
     * library.                                                      *
     ************************************************************************/
    sessions : { // openssl rand -base64 50

      /************************************************************************
       *                                                                      *
       * Session secret                                                       *
       *                                                                      *
       * ! ! ! IMPORTANT ! ! !                                                *
       *                                                                      *
       * Change the secret to something else, a good way to create random     *
       * secrets is using the command:                                        *
       *                                                                      *
       *    openssl rand -base64 50                                           *
       ************************************************************************/
      secret : 'E69EjH/F5F77QDSv8rRZfCtOGhgTaYRGsB3B3dQy0skUTq5nG1PECJ9bCx/0zg5AABI='
    },

    /************************************************************************
     *                                                                      *
     * Configuration on how authenticated uses can be redirected            *
     *                                                                      *
     ************************************************************************/
    redirects : {

      /************************************************************************
       *                                                                      *
       * Determines if redirects to non https locations is allowed            *
       *                                                                      *
       * default: true                                                        *
       *                                                                      *
       * Except for testing there is no reason to set this to false...        *
       ************************************************************************/
      httpsOnly:          true,

      /************************************************************************
       *                                                                      *
       * Determines where the tokens can be sent to, this is to prevent       *
       * someone from sending a user to the auth server and have them         *
       * redirect with the tokens to some malicious site                      *
       *                                                                      *
       * acceptDomains: ['127.0.0.1']                                         *
       *                                                                      *
       * Example:                                                             *
       * acceptDomains: ['www.site.com', "portal.site.com", "apps.site.com"]  *
       *                                                                      *
       * Each entry should be the hostname/ip which is allowed to being       *
       * redirected to. at this moment no wildcards are possible              *
       ************************************************************************/
      acceptDomains:      ['127.0.0.1'],

      /************************************************************************
       *                                                                      *
       * Determines where to send a user if they were not sent to the web-ui  *
       * with the ?return= query parameter. This might happen when for        *
       * example a user uses a link in his browser history.                   *
       *                                                                      *
       * Example:                                                             *
       * defaultRedirect: "https://apps.site.com/dashboard.html?cold"         *
       *                                                                      *
       * Each entry should be the hostname/ip which is allowed to being       *
       * redirected to. at this moment no wildcards are possible              *
       ************************************************************************/
      defaultRedirect:    'https://127.0.0.1/'
    },

    /************************************************************************
     *                                                                      *
     * Determines which url is set in the password reset email sent by the  *
     * authomator-api backend                                               *
     *                                                                      *
     * default: https://127.0.0.1:3000/reset-password                       *
     *                                                                      *
     * Please modify this according to your installation                    *
     ************************************************************************/
    resetUrl : 'http://127.0.0.1:3000/reset-password'

  },



  /************************************************************************
   *                                                                      *
   * Authomator API client configuration                                  *
   *                                                                      *
   ************************************************************************/
  AuthomatorNodeClient: {

  /************************************************************************
   *                                                                      *
   * URL of the authomator API to communicate with                        *
   *                                                                      *
   * Please modify this according to your installation                    *
   ************************************************************************/
    api: "https://127.0.0.1:3001"
  },

  /************************************************************************
   *                                                                      *
   * Logging configuration                                                *
   *                                                                      *
   ************************************************************************/
  logger: {

    /************************************************************************
     *                                                                      *
     * Logging format for http requests                                     *
     *                                                                      *
     * possible values:  combined | common | dev | short | tiny             *
     ************************************************************************/
    format: 'combined'
  }
};
