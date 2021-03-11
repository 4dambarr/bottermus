function onStokeTweet(tweet, T) {
  T.post('/statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
    if (err) {
      console.log(err);
    }
  });


  /* COMMENTED OUT FOR FUTURE IMPLEMENTATION
  var status = "COMMENT TEXT HERE";
  
  T.post('/statuses/update', {attachment_url:`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`, status: status}, function (err, data, response) {
    if (err) {
      console.log(err);
    }
  });
  */
}

module.exports = onStokeTweet;