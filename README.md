# auth-module-prodio

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)


`auth-module-prodio` is an  node js client for the  `auth-service-prodio API`. Integrate in to any application to perform auth releted user journeys.

# Features!
  
1. Signup/Register Account
2. Verify Account 
3. Regenerate OTP/verification token
4. Login
5. List Accounts
6. Forgot Password
7. Reset Password
8. Unregister/Deactivate Account

# Prerequisite:
 * Clone this repository on your server git clone https://github.com/ProdioDesignWorks/auth-service-prodio.git
 * Navigate to your repo cd auth-service-prodio
 * Install dependencies npm install
 * Start service node . or npm start or node server/server.js
 * If you've pm2 installed then use this pm2 start server/server.js --name="AUTH_SERVICE"

# Note:
`auth-service-prodio` uses loopback as the core framework for developing API's, so all customisations, configurations, middlewares, events, and db connectors can be used which you would have used in loopback.

# Installation

$ npm install auth-module-prodio --save

  
# Initialization 
Require the auth-module-prodio module and initialize the notificationSdk client.
```JSX

 const auth = require('auth-module-prodio');
 const authModule = new auth("API BASE PATH OF AUTH SERVICE");//http://domainname:3005/api
 ``` 


### Method
