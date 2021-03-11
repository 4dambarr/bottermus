function onChampionshipTweet(tweet, T) {
  // Very simple if tweet conatains stoke retweet
  if (tweet.text.toLowerCase().includes('stoke')) {
    T.post('/statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
      if (err) {
        console.log(err);
      }
    });
  }
}

export default onChampionshipTweet