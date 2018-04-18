const redis = require('redis');
const redisClient = redis.createClient(process.env.REACT_APP_REDIS_URL);
const schedule = require('node-schedule');

redisClient.on('error', function (err) {
  console.log('Error' + err);
});

redisClient.on('connect', () => {
  console.log('redis connect');
});

// flush redis at midnight
schedule.scheduleJob('0 0 * * *', () => {
  redisClient.flushdb( (err, succeeded) => {
    console.log('flush done', succeeded);
  });
});

// redisClient.flushdb( function (err, succeeded) {
//   console.log('flushing DB:', succeeded); // will be true if successfull
// });

module.exports = redisClient;