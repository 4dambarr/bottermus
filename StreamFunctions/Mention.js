const fs = require('fs')

const helloOne = fs.readFileSync('media/hello_1.gif', { encoding: 'base64' })
const helloTwo = fs.readFileSync('media/hello_2.gif', { encoding: 'base64' })

function onMention(tweet, T) {
    console.log('tweet recieved:', tweet.text)

    var randomNum = Math.floor(Math.random() * 2)
    var responseGif;
    switch (randomNum) {
        case 0:
            responseGif = helloOne;
            break
        case 1:
            responseGif = helloTwo;
            break
        default:
            responseGif = helloOne;
    }
    console.log('uploading gif')
    T.post('media/upload', { media_data: responseGif }, function (err, data, response) {
        if (err) {
            console.log(err)
        }
        var mediaID = data.media_id_string
        var altText = "Pottermus greeting gif"
        var meta_params = {
            media_id: mediaID,
            alt_text: { text: altText }
        }

        console.log('Setting gif metadata')
        T.post('media/metadata/create', meta_params, function (err, data, response) {
            if (!err) {
                var reply_params = {
                    in_reply_to_status_id: tweet.id_str,
                    status: `Hi ${tweet.user.name}! I am Bottermus, a twitter bot for all things Stoke, I'm currently under development, but heres a gif of me to keep you entertained.`,
                    auto_populate_reply_metadata: true,
                    media_ids: [mediaID]
                }

                console.log('sending response')
                T.post('statuses/update', reply_params, function (err, data, response) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('done')
                    }
                })
            } else {
                console.log(err)
            }
        })
    });
}

module.exports = onMention;