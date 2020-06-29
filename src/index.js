
// eslint-disable-next-line import/prefer-default-export
const axios = require('axios');
const HttpErrors = require('http-errors');
const CircularJSON = require('circular-json');

const { 
  REGISTERACCOUNT, VERIFYTOKEN, GENERATETOKEN, LOGIN,
  LISTACCOUNTS, FORGOTPASSWORD, RESETPASSWORD, CHANGEPASSWORD, 
  DELETEACCOUNT, GET_GOOGLE_SIGNIN_URL, GOOGLE_SIGNUP, GOOGLE_ACCOUNT_LINK_EMAIL
} = require('./config/constant.js');

const isNull = function (val) {
  if (typeof val === 'string') { val = val.trim(); }
  if (val === undefined || val === null || typeof val === 'undefined' || val === '' || val === 'undefined') {
    return true;
  }
  return false;
};
const isValidEmail = (val) => {
  val = getFormattedEmail(val);
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(val);
};

const getFormattedEmail = (val) => {
  return val.trim().toLowerCase();
}

const isJson = (str) => {
  try {
    var obj = JSON.parse(JSON.stringify(str));
    if (obj && typeof obj === 'object' && obj !== null) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
}

function authModule(BASE_URL) {
  this.BASE_URL = BASE_URL;

  this.execute = function (payload, callback) {
    // action key calls api.
    if (payload.action === REGISTERACCOUNT) {
      return registerAccount(payload, this.BASE_URL, callback);
    } else if (payload.action === VERIFYTOKEN) {
      return verifyToken(payload, this.BASE_URL, callback);
    } else if (payload.action === GENERATETOKEN) {
      return regenerateToken(payload, this.BASE_URL, callback);
    } else if (payload.action === LOGIN) {
      return login(payload, this.BASE_URL, callback);
    } else if (payload.action === LISTACCOUNTS) {
      return listAccounts(payload, this.BASE_URL, callback);
    } else if (payload.action === FORGOTPASSWORD) {
      return forgotPassword(payload, this.BASE_URL, callback);
    } else if (payload.action === RESETPASSWORD) {
      return resetPassword(payload, this.BASE_URL, callback);
    } else if (payload.action === CHANGEPASSWORD) {
      return changePassword(payload, this.BASE_URL, callback);
    } else if (payload.action === DELETEACCOUNT) {
      return deleteAccount(payload, this.BASE_URL, callback);
    } else if(payload.action === GET_GOOGLE_SIGNIN_URL){
      return getGoogleSigninUrl(payload, this.BASE_URL, callback);
    } else if(payload.action === GOOGLE_SIGNUP){
      return googleSignin(payload, this.BASE_URL, callback);
   }else if(payload.action === GOOGLE_ACCOUNT_LINK_EMAIL){
  return googleAccountLinkEmail(payload, this.BASE_URL, callback);
 } else {
      return callback(new HttpErrors.BadRequest('Invalid Action.', { expose: false }));
    }
  };
}

const registerAccount = function (payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else {
      const url = `${BASE_URL}/authAccounts/register`;
      axios.post(url, payload).then(response => {
        return callback(response);
      }).catch((error) => {
        let json = CircularJSON.stringify(error);
        return callback(json);
      });
    }
  }
}

const verifyToken = function (payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else {
      const url = `${BASE_URL}/authAccounts/verify`;
      axios.post(url, payload).then(response => {
        return callback(response);
      }).catch((error) => {
        let json = CircularJSON.stringify(error);
        return callback(json);
      });
    }
  }
}

const regenerateToken = function (payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else {
      const url = `${BASE_URL}/authAccounts/tokenRequest`;
      axios.post(url, payload).then(response => {
        return callback(response);
      }).catch((error) => {
        let json = CircularJSON.stringify(error);
        return callback(json);
      });
    }
  }
}

const login = function (payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else {
      const url = `${BASE_URL}/authAccounts/login`;
      axios.post(url, payload).then(response => {
        return callback(response);
      }).catch((error) => {
        let json = CircularJSON.stringify(error);
        return callback(json);
      });
    }
  }
}

const listAccounts = function (payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    const url = `${BASE_URL}/authAccounts/accounts`;
    axios.get(url).then(response => {
      return callback(response);
    }).catch((error) => {
      let json = CircularJSON.stringify(error);
      return callback(json);
    });
  }
}

const forgotPassword = function (payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else if (isNull(payload.email)) {
      return callback(new HttpErrors.BadRequest('Email address is mandatory.', { expose: false }))
    } else if (!isValidEmail(payload.email)) {
      return callback(new HttpErrors.BadRequest('Invalid Email address.', { expose: false }))
    } else {
      const url = `${BASE_URL}/authAccounts/tokenRequest`;
      axios.post(url, payload).then(response => {
        return callback(response);
      }).catch((error) => {
        let json = CircularJSON.stringify(error);
        return callback(json);
      });
    }
  }
}

const resetPassword = function (payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else if (isNull(payload.verificationToken)) {
      return cb(new HttpErrors.BadRequest('Reset token is mandatory.', { expose: false }))
    } else if (isNull(payload.password)) {
      return cb(new HttpErrors.BadRequest('Password is mandatory.', { expose: false }))
    } else {
      const url = `${BASE_URL}/authAccounts/resetPassword`;
      axios.post(url, payload).then(response => {
        return callback(response);
      }).catch((error) => {
        let json = CircularJSON.stringify(error);
        return callback(json);
      });
    }
  }
}

const changePassword = function (payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else if (isNull(payload.email)) {
      return cb(new HttpErrors.BadRequest('Email address is mandatory.', { expose: false }))
    } else if (isNull(payload.oldPassword)) {
      return cb(new HttpErrors.BadRequest('Old password is mandatory.', { expose: false }))
    } else if (isNull(payload.newPassword)) {
      return cb(new HttpErrors.BadRequest('New password is mandatory.', { expose: false }))
    } else if (!isValidEmail(payload.email)) {
      return cb(new HttpErrors.BadRequest('Invalid Email address.', { expose: false }))
    } else {
      const url = `${BASE_URL}/authAccounts/changePassword`;
      axios.post(url, payload).then(response => {
        return callback(response);
      }).catch((error) => {
        let json = CircularJSON.stringify(error);
        return callback(json);
      });
    }
  }
}

const deleteAccount = function (payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else {
      const url = `${BASE_URL}/authAccounts/unregister`;
      axios.post(url, payload).then(response => {
        return callback(response);
      }).catch((error) => {
        let json = CircularJSON.stringify(error);
        return callback(json);
      });
    }
  }
}

const getGoogleSigninUrl = (payload, BASE_URL, callback) => {
  payload = payload.meta || {};

  const url = `${BASE_URL}/authAccounts/googleSignInUrl`;
  const queryParams = Object.keys(payload).map(
    key => `${key}=${payload[key]}`
  ).join('&');
  
  axios.get(`${url}?${queryParams}`).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = CircularJSON.stringify(error);
    return callback(json);
  });
}

const googleSignin = (payload, BASE_URL, callback) => {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else {
      const url = `${BASE_URL}/authAccounts/googleSignIn`;
      const queryParams = Object.keys(payload).map(
        key => `${key}=${payload[key]}`
      ).join('&');

      axios.get(`${url}?${queryParams}`).then(response => {
        return callback(response);
      }).catch((error) => {
        let json = CircularJSON.stringify(error);
        return callback(json);
      });
    }
  }
}
const googleAccountLinkEmail = (payload, BASE_URL, callback) => {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else {
      const url = `${BASE_URL}/authAccounts/googleAccountLinkEmail`;
      axios.post(url, payload).then(response => {
        return callback(response);
      }).catch((error) => {
        let json = CircularJSON.stringify(error);
        return callback(json);
      });
    }
  }
}

module.exports = authModule;
