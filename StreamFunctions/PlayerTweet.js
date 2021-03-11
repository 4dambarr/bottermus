function onPlayerTweet(tweet, T) {
  T.post('/statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = onPlayerTweet