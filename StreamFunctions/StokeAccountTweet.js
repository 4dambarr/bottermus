function onStokeTweet(tweet, T) {
  T.post('/statuses/retweet/:id', {id: tweet.id_str, status: 'Retweeting this:'}, function (err, data, response) {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = onStokeTweet;