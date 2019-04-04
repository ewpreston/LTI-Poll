import {Result} from "../common/pollTypes";

let redis = require('redis');

module.exports = function () {
  let redisClient = {};
  return {
    redisSave: function (key, value) {
      redisClient.set(key, JSON.stringify(value), function (err, res) {
        console.log("saveProxy err " + err);
        console.log("saveProxy res " + res);
      });
    },

    redisInit: function (host, port, url, password) {
      console.log("redisInit; host: " + host, ", url: " + url);
      if (url) {
        redisClient = redis.createClient({"url": url, "password": password})
      } else if (host) {
        redisClient = redis.createClient({"host": host, "port": port});
      }

      redisClient.on("error", function (err) {
        console.log("Redis error " + err);
      });
      return this.redisClient;
    },

    redisGet: function (key) {
      return new Promise(function (resolve, reject) {
        redisClient.get(key, function (err, res) {
          resolve(JSON.parse(res));
        });
      });
    },

    getToolProxy: function () {
      return new Promise(function (resolve, reject) {
        redisClient.keys("*-*", function (err, replies) {
          console.log(replies.length + " replies:");
          replies.forEach(function (reply, i) {
            console.log("    " + i + ": " + reply);
          });
          redisClient.mget(replies, function (err, results) {
            resolve(results);
          });
        });
      });
    },

    savePollQuestion: function (pollId, question) {
      let key = pollId + 'Q';
      this.redisSave(key, question);
    },

    loadPollQuestion: function (pollId) {
      let key = pollId + 'Q';
      this.redisGet(key).then((question) => {
        console.log(question);
        return question;
      });
    },

    savePollOptions: function (pollId, options) {
      let key = pollId + 'A';
      let value = JSON.stringify(options);
      this.redisSave(key, value);
    },

    loadPollOptions: function (pollId) {
      let key = pollId + 'A';
      this.redisGet(key).then((value) => {
        let options = JSON.parse(value);
        console.log(options);
        return options;
      });
    },

    savePollAnswer: function (pollId, answer) {
      let key = pollId + 'R';
      this.redisGet(key).then((value) => {
        let response;
        if (value) {
          response = JSON.parse(value);
          response.push(answer);
        } else {
          response = [ answer ];
        }
        this.redisSave(key, JSON.stringify(response));
      });
    },

    loadPollResults: function (pollId) {
      let rKey = pollId + 'R';
      let aKey = pollId + 'A';
      this.redisGet(aKey).then((aValue) => {
        let answers = JSON.parse(aValue);
        let results = [];
        for (let i = 0; i < answers.length; i++) {
          let result = new Result();
          result.option = answers[i];
          result.index = i;
          result.count = 0;
          results.push(result);
        }
        this.redisGet(rKey).then((rValue) => {
          let counts = JSON.parse(rValue);
          for (let j = 0; j < counts.length; j++) {
            results[counts[j]].count++;
          }
          console.log(results);
          return results;
        });
      });
    }
  };
}();
