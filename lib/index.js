'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// eslint-disable-next-line import/prefer-default-export
var axios = require('axios');
var HttpErrors = require('http-errors');
var CircularJSON = require('circular-json');

var _require = require('./config/constant.js'),
    REGISTERACCOUNT = _require.REGISTERACCOUNT,
    VERIFYTOKEN = _require.VERIFYTOKEN,
    GENERATETOKEN = _require.GENERATETOKEN,
    LOGIN = _require.LOGIN,
    LISTACCOUNTS = _require.LISTACCOUNTS,
    FORGOTPASSWORD = _require.FORGOTPASSWORD,
    RESETPASSWORD = _require.RESETPASSWORD,
    CHANGEPASSWORD = _require.CHANGEPASSWORD,
    DELETEACCOUNT = _require.DELETEACCOUNT,
    GET_GOOGLE_SIGNIN_URL = _require.GET_GOOGLE_SIGNIN_URL,
    GOOGLE_SIGNUP = _require.GOOGLE_SIGNUP;

var isNull = function isNull(val) {
  if (typeof val === 'string') {
    val = val.trim();
  }
  if (val === undefined || val === null || typeof val === 'undefined' || val === '' || val === 'undefined') {
    return true;
  }
  return false;
};
var isValidEmail = function isValidEmail(val) {
  val = getFormattedEmail(val);
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(val);
};

var getFormattedEmail = function getFormattedEmail(val) {
  return val.trim().toLowerCase();
};

var isJson = function isJson(str) {
  try {
    var obj = JSON.parse(JSON.stringify(str));
    if (obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
};

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
    } else if (payload.action === GET_GOOGLE_SIGNIN_URL) {
      return getGoogleSigninUrl(payload, this.BASE_URL, callback);
    } else if (payload.action === GOOGLE_SIGNUP) {
      return googleSignin(payload, this.BASE_URL, callback);
    } else if (payload.action === GOOGLE_ACCOUNT_LINK_EMAIL) {
      return googleAccountLinkEmail(payload, this.BASE_URL, callback);
    } else {
      return callback(new HttpErrors.BadRequest('Invalid Action.', { expose: false }));
    }
  };
}

var registerAccount = function registerAccount(payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else {
      var url = BASE_URL + '/authAccounts/register';
      axios.post(url, payload).then(function (response) {
        return callback(response);
      }).catch(function (error) {
        var json = CircularJSON.stringify(error);
        return callback(json);
      });
    }
  }
};

var verifyToken = function verifyToken(payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else {
      var url = BASE_URL + '/authAccounts/verify';
      axios.post(url, payload).then(function (response) {
        return callback(response);
      }).catch(function (error) {
        var json = CircularJSON.stringify(error);
        return callback(json);
      });
    }
  }
};

var regenerateToken = function regenerateToken(payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else {
      var url = BASE_URL + '/authAccounts/tokenRequest';
      axios.post(url, payload).then(function (response) {
        return callback(response);
      }).catch(function (error) {
        var json = CircularJSON.stringify(error);
        return callback(json);
      });
    }
  }
};

var login = function login(payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else {
      var url = BASE_URL + '/authAccounts/login';
      axios.post(url, payload).then(function (response) {
        return callback(response);
      }).catch(function (error) {
        var json = CircularJSON.stringify(error);
        return callback(json);
      });
    }
  }
};

var listAccounts = function listAccounts(payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    var url = BASE_URL + '/authAccounts/accounts';
    axios.get(url).then(function (response) {
      return callback(response);
    }).catch(function (error) {
      var json = CircularJSON.stringify(error);
      return callback(json);
    });
  }
};

var forgotPassword = function forgotPassword(payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else if (isNull(payload.email)) {
      return callback(new HttpErrors.BadRequest('Email address is mandatory.', { expose: false }));
    } else if (!isValidEmail(payload.email)) {
      return callback(new HttpErrors.BadRequest('Invalid Email address.', { expose: false }));
    } else {
      var url = BASE_URL + '/authAccounts/tokenRequest';
      axios.post(url, payload).then(function (response) {
        return callback(response);
      }).catch(function (error) {
        var json = CircularJSON.stringify(error);
        return callback(json);
      });
    }
  }
};

var resetPassword = function resetPassword(payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else if (isNull(payload.verificationToken)) {
      return cb(new HttpErrors.BadRequest('Reset token is mandatory.', { expose: false }));
    } else if (isNull(payload.password)) {
      return cb(new HttpErrors.BadRequest('Password is mandatory.', { expose: false }));
    } else {
      var url = BASE_URL + '/authAccounts/resetPassword';
      axios.post(url, payload).then(function (response) {
        return callback(response);
      }).catch(function (error) {
        var json = CircularJSON.stringify(error);
        return callback(json);
      });
    }
  }
};

var changePassword = function changePassword(payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else if (isNull(payload.email)) {
      return cb(new HttpErrors.BadRequest('Email address is mandatory.', { expose: false }));
    } else if (isNull(payload.oldPassword)) {
      return cb(new HttpErrors.BadRequest('Old password is mandatory.', { expose: false }));
    } else if (isNull(payload.newPassword)) {
      return cb(new HttpErrors.BadRequest('New password is mandatory.', { expose: false }));
    } else if (!isValidEmail(payload.email)) {
      return cb(new HttpErrors.BadRequest('Invalid Email address.', { expose: false }));
    } else {
      var url = BASE_URL + '/authAccounts/changePassword';
      axios.post(url, payload).then(function (response) {
        return callback(response);
      }).catch(function (error) {
        var json = CircularJSON.stringify(error);
        return callback(json);
      });
    }
  }
};

var deleteAccount = function deleteAccount(payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else {
      var url = BASE_URL + '/authAccounts/unregister';
      axios.post(url, payload).then(function (response) {
        return callback(response);
      }).catch(function (error) {
        var json = CircularJSON.stringify(error);
        return callback(json);
      });
    }
  }
};

var getGoogleSigninUrl = function getGoogleSigninUrl(payload, BASE_URL, callback) {
  payload = payload.meta || {};

  var url = BASE_URL + '/authAccounts/googleSignInUrl';
  var queryParams = Object.keys(payload).map(function (key) {
    return key + '=' + payload[key];
  }).join('&');

  axios.get(url + '?' + queryParams).then(function (response) {
    return callback(response);
  }).catch(function (error) {
    var json = CircularJSON.stringify(error);
    return callback(json);
  });
};

var googleSignin = function googleSignin(payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else {
      var url = BASE_URL + '/authAccounts/googleSignIn';
      var queryParams = Object.keys(payload).map(function (key) {
        return key + '=' + payload[key];
      }).join('&');

      axios.get(url + '?' + queryParams).then(function (response) {
        return callback(response);
      }).catch(function (error) {
        var json = CircularJSON.stringify(error);
        return callback(json);
      });
    }
  }
};
var googleAccountLinkEmail = function googleAccountLinkEmail(payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else {
      var url = BASE_URL + '/authAccounts/googleAccountLinkEmail';
      axios.post(url, payload).then(function (response) {
        return callback(response);
      }).catch(function (error) {
        var json = CircularJSON.stringify(error);
        return callback(json);
      });
    }
  }
};

module.exports = authModule;