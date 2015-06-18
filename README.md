# Authomator Express Application

[![Build Status](https://travis-ci.org/authomator/authomator-web-ui.svg?branch=master)](https://travis-ci.org/authomator/authomator-web-ui)

Complete Express based application to integrate with an [Authomator](https://github.com/authomator/authomator-api) API. Features:

- signup page
- login page
- password reset page

## Configuration

The configuration is stored in configuration files in the `/config` directory.

It can be overriden and extended using the [node-config](https://github.com/lorenwest/node-config) rules.

e.g.

```bash
# Default configuration
/config/default.js

# Production configuration
/config/production.js

# Local configuration
/config/local.js
```

See [configuration files](https://github.com/lorenwest/node-config/wiki/Configuration-Files) for more information.

## Start the web UI

To start the server:

```bash
$ node index.js
```

## Development

To run the build process:

```bash
$ gulp
```

To run the tests:

```bash
$ npm test
```

## Structure



## Change log

### v0.1.0

- Added modular structure
