const fs = require('fs')

function isSquad(text) {
  const squadWords = ['line up', 'team news', 'on bench', 'on the bench', 'come in', 'no changes']
  for (let phrase of squadWords) {
    if (text.includes(phrase)) {
      return true
    }
  }
  return false
}

const squadGif = fs.readFileSync('media/throwAwayComputer.gif', { encoding: 'base64' })

function replyToSquad(tweet, T) {
  T.post('media/upload', { media_data: squadGif }, function (err, data, response) {
      if (err) {
          console.log(err)
      }
      var mediaID = data.media_id_string
      var altText = "Throwing computer in bin"
      var meta_params = {
          media_id: mediaID,
          alt_text: { text: altText }
      }

      console.log('Setting gif metadata')
      T.post('media/metadata/create', meta_params, function (err, data, response) {
          if (!err) {
              var reply_params = {
                  in_reply_to_status_id: tweet.id_str,
                  status: `Unfortunately this bot isn't clever enough to read the squad yet, but I'm just going to assume Mikel is in the squad and reply with this gif`,
                  auto_populate_reply_metadata: true,
                  media_ids: [mediaID]
              }

              console.log('sending response')
              T.post('statuses/update', reply_params, function (err, data, response) {
                  if (err) {
                      console.log(err)
                  } else {
                      console.log('Replied to squad')
                  }
              })
          } else {
              console.log(err)
          }
      })
  });
}

async function onStokeTweet(tweet, T) {
  var lowerText = tweet.text.toLowerCase();
  
  if (await isSquad(lowerText)) {
    replyToSquad(tweet, T)
  }

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

let test1 = "𝗧𝗘𝗔𝗠 𝗡𝗘𝗪𝗦 Black medium square One change. Black medium square Allen out, Mikel in. Black medium square Forrester & Norton named on the bench."
let inputTweet = {
  text: test1
}

onStokeTweet(inputTweet, null)

module.exports = onStokeTweet;