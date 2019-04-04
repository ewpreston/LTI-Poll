var lti = require('ims-lti');
var caliper = require('ims-caliper');
var _ = require('lodash');
var oauth = require('oauth-signature');
var https = require('https');
var finish = require('finish');
var HMAC_SHA = require('./hmac-sha1');
var utils = require('./utils');
var url = require('url');
var uuid = require('uuid');
const util = require('util');

//set false to allow self-signed certs with local Learn
var rejectUnauthorized = true;

//LTI Variables
var consumer_key = "12345";
var consumer_secret = "secret";
var lis_result_sourcedid = "";
var lis_outcome_service_url = "";
var return_url = "https://community.blackboard.com/community/developers";
var membership_url = "";
var placement_parm = "";
var sha_method = "";

//Caliper Variables
var caliper_profile_url = "";
var caliper_host = "";
var caliper_path = "";
var custom_caliper_federated_session_id = "";
var caliper_id = "";
var eventStoreUrl = "";
var apiKey = "";

//REST
var app_key = "d03caa33-1095-47b9-bc67-f5cd634430b1";
var app_secret = "QSFClAMu5KmoG8yFbHTi7pjhsseJl4uz";
var access_token = "";
var token_type = "";
var expires_in = "";
var user_id = "";
var course_id = "";

var oauth_consumer_key = "";
var oauth_nonce = "";
var caliper_profile_url_parts = "";

/*
 * POST LTI Launch Received
 */

exports.got_launch = function (req, res) {

  var provider = new lti.Provider(consumer_key, consumer_secret);
  req.body = _.omit(req.body, '__proto__');

  var content = "";

  var keys = Object.keys(req.body).sort();
  for (var i = 0, length = keys.length; i < length; i++) {
    content += keys[i] + " = " + req.body[keys[i]] + "<br />";
  }

  lis_result_sourcedid = req.body.lis_result_sourcedid;
  lis_outcome_service_url = req.body.lis_outcome_service_url;
  caliper_profile_url = req.body.custom_caliper_profile_url;
  custom_caliper_federated_session_id = req.body.custom_caliper_federated_session_id;
  oauth_consumer_key = req.body.oauth_consumer_key;
  oauth_nonce = req.body.oauth_nonce;
  course_id = req.body.context_id;
  user_id = req.body.user_id;
  return_url = req.body.launch_presentation_return_url;
  sha_method = req.body.oauth_signature_method;
  console.log("Signature Method: " + sha_method);

  if (req.body.custom_context_memberships_url !== undefined) {
    membership_url = req.body.custom_context_memberships_url;
    placement_parm = membership_url.substring(membership_url.indexOf("=") + 1);
  } else {
    membership_url = "";
    placement_parm = "";
  }

  if (return_url === undefined && caliper_profile_url !== undefined) {
    var parts = url.parse(caliper_profile_url, true);
    return_url = parts.protocol + '//' + parts.host;
  } else if (return_url === undefined) {
    return_url = "http://google.com";
  }

  res.render('lti', {
    title: 'LTI Launch Received!',
    content: content,
    return_url: return_url,
    return_onclick: 'location.href=' + '\'' + return_url + '\';'
  });
};


exports.outcomes = function (req, res) {
  res.render('outcomes', {
    title: 'Enter Grade',
    sourcedid: lis_result_sourcedid,
    endpoint: lis_outcome_service_url,
    key: consumer_key,
    secret: consumer_secret
  })
};


exports.send_outcomes = function (req, res) {

  var options = {};

  options.consumer_key = req.body.key;
  options.consumer_secret = req.body.secret;
  options.service_url = req.body.url;
  options.source_did = req.body.sourcedid;

  var grade = parseFloat(req.body.grade);

  var outcomes_service = new lti.OutcomeService(options);

  outcomes_service.send_replace_result(grade, function (err, result) {
    console.log(result); //True or false

    if (result) {
      res.render('lti', {
        title: 'Outcome successfully sent!',
        content: result,
        return_url: return_url,
        return_onclick: 'location.href=' + '\'' + return_url + '\';'
      });
    }
    else {
      res.render('lti', {
        title: 'Outcome Failed!',
        content: err,
        return_url: return_url,
        return_onclick: 'location.href=' + '\'' + return_url + '\';'
      });
    }
  });
};


exports.rest_auth = function (req, res) {

  //build url from caliper profile url
  var parts = url.parse(caliper_profile_url, true);
  var oauth_host = parts.protocol + '//' + parts.host;

  var auth_hash = new Buffer(app_key + ":" + app_secret).toString('base64');

  var auth_string = 'Basic ' + auth_hash;

  console.log("oauth_host: " + oauth_host + " auth_hash: " + auth_hash + " auth_string: " + auth_string);

  var options = {
    hostname: parts.hostname,
    path: '/learn/api/public/v1/oauth2/token',
    method: 'POST',
    headers: {"Authorization": auth_string, "Content-Type": "application/x-www-form-urlencoded"}
  };

  console.log(options);

  var http_req = https.request(options, function (http_res) {
    http_res.setEncoding('utf-8');
    var responseString = '';
    http_res.on('data', function (data) {
      responseString += data;
    });
    http_res.on('end', function () {
      console.log(responseString);
      var json = JSON.parse(responseString);
      access_token = json['access_token'];
      token_type = json['token_type'];
      expires_in = json['expires_in'];

      console.log("Access Token: " + access_token + " Token Type: " + token_type + " Expires In: " + expires_in);

      res.render('lti', {
        title: 'REST Token Response Received!',
        content: '<pre>' + JSON.stringify(json, null, '  ') + '</pre>',
        return_url: return_url,
        return_onclick: 'location.href=' + '\'' + return_url + '\';'
      });
    });
  });

  var grant = "grant_type=client_credentials";

  http_req.write(grant);
  console.log(http_req);
  http_req.end();
};


exports.rest_getuser = function (req, res) {
  //build url from caliper profile url
  var parts = url.parse(caliper_profile_url, true);
  var oauth_host = parts.protocol + '//' + parts.host;

  var auth_string = 'Bearer ' + access_token;

  var user_path = '/learn/api/public/v1/users/uuid:' + user_id;

  var options = {
    hostname: parts.hostname,
    path: user_path,
    method: 'GET',
    headers: {"Authorization": auth_string}
  };

  console.log(options);

  var http_req = https.request(options, function (http_res) {
    http_res.setEncoding('utf-8');
    var responseString = '';
    http_res.on('data', function (data) {
      responseString += data;
    });
    http_res.on('end', function () {
      console.log(responseString);
      var json = JSON.parse(responseString);

      console.log("User Info: " + JSON.stringify(json, null, '  '));

      res.render('lti', {
        title: 'REST User Info Received!',
        content: '<pre>' + JSON.stringify(json, null, '  ') + '</pre>',
        return_url: return_url,
        return_onclick: 'location.href=' + '\'' + return_url + '\';'
      });
    });
  });

  http_req.write("");
  console.log(http_req);
  http_req.end();
};


exports.rest_getcourse = function (req, res) {
  //build url from caliper profile url
  var parts = url.parse(caliper_profile_url, true);
  var oauth_host = parts.protocol + '//' + parts.host;

  var auth_string = 'Bearer ' + access_token;
  var course_path = '/learn/api/public/v1/courses/uuid:' + course_id;

  var options = {
    hostname: parts.hostname,
    path: course_path,
    method: 'GET',
    headers: {"Authorization": auth_string}
  };

  console.log(options);

  var http_req = https.request(options, function (http_res) {
    http_res.setEncoding('utf-8');
    var responseString = '';
    http_res.on('data', function (data) {
      responseString += data;
    });
    http_res.on('end', function () {
      console.log(responseString);
      var json = JSON.parse(responseString);

      console.log("Course Info: " + JSON.stringify(json, null, '  '));

      res.render('lti', {
        title: 'REST Course Info Received!',
        content: '<pre>' + JSON.stringify(json, null, '  ') + '</pre>',
        return_url: return_url,
        return_onclick: 'location.href=' + '\'' + return_url + '\';'
      });
    });
  });

  http_req.write("");
  console.log(http_req);
  http_req.end();
};


exports.get_membership = function (req, res) {
  if (membership_url !== '') {
    let parts = url.parse(membership_url, true);

    let options = {
      consumer_key: consumer_key,
      consumer_secret: consumer_secret,
      url: parts.protocol + "//" + parts.host + parts.pathname, // Rebuild url without parameters
      oauth_version: '1.0',
      oauth_signature_method: sha_method
    };

    if (sha_method === 'HMAC-SHA256') {
      options.signer = new HMAC_SHA.HMAC_SHA2();
    } else {
      options.signer = new HMAC_SHA.HMAC_SHA1();
    }

    let req_options = {
      hostname: parts.hostname,
      path: parts.path,
      method: 'GET',
      headers: _build_headers(options, parts)
    };

    console.log(req_options);

    let http_req = https.request(req_options, function (http_res) {
      http_res.setEncoding('utf-8');
      let responseString = '';

      http_res.on('data', function (data) {
        responseString += data;
      });

      http_res.on('end', function () {
        let json = JSON.parse(responseString);

        res.render('lti', {
          title: 'Membership Info Received',
          content: '<pre>' + JSON.stringify(json, null, '  ') + '</pre>',
          return_url: return_url,
          return_onclick: 'location.href=' + '\'' + return_url + '\';'
        });
      });
    });

    http_req.write("");
    http_req.end();
  }
  else {
    res.render('lti', {
      title: 'Membership service not supported',
      content: '<h2>Membership service not supported</h2>',
      return_url: return_url,
      return_onclick: 'location.href=' + '\'' + return_url + '\';'
    });
  }
};


let _build_headers = function (options, parts) {
  let headers, key, val;

  headers = {
    oauth_version: options.oauth_version,
    oauth_nonce: uuid.v4(),
    oauth_timestamp: Math.round(Date.now() / 1000),
    oauth_consumer_key: options.consumer_key,
    oauth_signature_method: options.oauth_signature_method
  };

  headers.oauth_signature = options.signer.build_signature_raw(options.url, parts, 'GET', headers, options.consumer_secret);
//  console.log(options.oauth_signature_method + " signature: " + headers.oauth_signature);

  return {
    Authorization: 'OAuth realm="",' + ((function () {
      let results;
      results = [];
      for (key in headers) {
        val = headers[key];
        results.push(key + "=\"" + (utils.special_encode(val)) + "\"");
      }
      return results;
    })()).join(','),
    'Content-Type': 'application/xml',
    'Content-Length': 0
  };
};
