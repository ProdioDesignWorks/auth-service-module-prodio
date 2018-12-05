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

`1. Signup/Register:`
 This will create/register a new account.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `REGISTERACCOUNT` | key which defines the type of action to be performed | YES |
| `meta` | json | refer example below | - | YES |

#### Example
```JSX
	const emailMetaInfo = {
		"email": "",
		"password": ""
	};
	const otpMetaInfo = {
		"phone": ""
	}
	const  payload = {
		"action": "REGISTERACCOUNT",
		"meta": emailMetaInfo // or otpMetaInfo
	};
	let account = authModule.execute(payload);
```

`2. Verify Account Token:`
 This will verify an account.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `VERIFYTOKEN` | key which defines the type of action to be performed | YES |
| `meta` | json | refer example below | - | YES |

#### Example
```JSX
	const emailMetaInfo = {
		"verificationToken": ""
	};
	const otpMetaInfo = {
		"phone": "",
		"otp": ""
	}
	const  payload = {
		"action": "VERIFYTOKEN",
		"meta": emailMetaInfo // or otpMetaInfo
	};
	let verify = authModule.execute(payload);
```

`3. Generate email verification token or otp:`
 This will regenerate verification tokens.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `GENERATETOKEN` | key which defines the type of action to be performed | YES |
| `meta` | json | refer example below | - | YES |

#### Example
```JSX
	const emailMetaInfo = {
		"email": ""
	};
	const otpMetaInfo = {
		"phone": ""
	}
	const  payload = {
		"action": "GENERATETOKEN",
		"meta": emailMetaInfo // or otpMetaInfo
	};
	let token = authModule.execute(payload);
```

`4. Login:`
 This will validate login of an account if email based. If otp based, will generate an otp which will have to verified using verify account token method(2).

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `LOGIN` | key which defines the type of action to be performed | YES |
| `meta` | json | refer example below | - | YES |

#### Example
```JSX
	const emailMetaInfo = {
		"email": "",
		"password":""
	};
	const otpMetaInfo = {
		"phone": ""
	}
	const  payload = {
		"action": "LOGIN",
		"meta": emailMetaInfo // or otpMetaInfo
	};
	let login = authModule.execute(payload);
```

`5. List accounts:`
 This will list all the accounts.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `LISTACCOUNTS` | key which defines the type of action to be performed | YES |
| `meta` | json | refer example below | - | YES |

#### Example
```JSX
	const  payload = {
		"action": "LISTACCOUNTS"
	};
	let accounts = authModule.execute(payload);
```

`6. Forgot Password:`
 Only for email based auth. It will generate an token which will be required when resetting the password.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `FORGOTPASSWORD` | key which defines the type of action to be performed | YES |
| `meta` | json | refer example below | - | YES |

#### Example
```JSX
	const emailMetaInfo = {
		"email": ""
	};
	const  payload = {
		"action": "FORGOTPASSWORD",
		"meta": emailMetaInfo
	};
	let forgot = authModule.execute(payload);
```

`7. Reset Password:`
 Only for email based auth. Based on the token generated in forgot password, new password can be created.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `RESETPASSWORD` | key which defines the type of action to be performed | YES |
| `meta` | json | refer example below | - | YES |

#### Example
```JSX
	const emailMetaInfo = {
		"verificationToken": "",
		"password": ""
	};
	const  payload = {
		"action": "RESETPASSWORD",
		"meta": emailMetaInfo
	};
	let reset = authModule.execute(payload);
```

`8. Change Password:`
 Only for email based auth. Change an existing password.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `CHANGEPASSWORD` | key which defines the type of action to be performed | YES |
| `meta` | json | refer example below | - | YES |

#### Example
```JSX
	const emailMetaInfo = {
		"email": "",
		"oldPassword": "",
		"newPassword": ""
	};
	const  payload = {
		"action": "CHANGEPASSWORD",
		"meta": emailMetaInfo
	};
	let change = authModule.execute(payload);
```

`8. Delete Account:`
 Will delete the account and no other action can be done using the account further.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `DELETEACCOUNT` | key which defines the type of action to be performed | YES |
| `meta` | json | refer example below | - | YES |

#### Example
```JSX
	const emailMetaInfo = {
		"email": "",
	};
	const otpMetaInfo = {
		"phone": ""
	}
	const  payload = {
		"action": "DELETEACCOUNT",
		"meta": emailMetaInfo // or otpMetaInfo
	};
	let delete = authModule.execute(payload);
```
