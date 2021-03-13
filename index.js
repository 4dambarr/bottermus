var Twit = require('twit');
const fs = require('fs')

const express = require("express")
const app = express();
const port = process.env.PORT || 4012

app.get('/', (req, res) => {
    res.send("Hello, but you're somewhere you're not meant to be, so goodbye")
});

var config;

try {
    config = require('./config');
} catch {
    config = {
        consumer_key: process.env.consumer_key,
        consumer_secret: process.env.consumer_secret,
        access_token: process.env.access_token,
        access_token_secret: process.env.access_token_secret,
    };
}

var T = new Twit({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token: config.access_token,
    access_token_secret: config.access_token_secret,
});

const stokeID = '44335177';
//const stokeID = '1353088861115740161';
var playerIDs = ['1104054431455285248', '60405865', '148418812', '1146246312', '3341648117', '1203375180359311360', '141316422', '1245046966763098118', '874778624553078784', '1230247777898242058', '186528861', '1181645582202527744', '2562338819', '2878235547', '578375905']
var championshipID = '448391206'

const onMention = require('./StreamFunctions/Mention');
const onStokeTweet = require('./StreamFunctions/StokeAccountTweet');
const onPlayerTweet = require('./StreamFunctions/PlayerTweet');
const onChampionshipTweet = require('./StreamFunctions/ChampionshipTweet');

var ids = [stokeID, championshipID, ...playerIDs]

var stream = T.stream('statuses/filter', { track: ['@bottermus'], follow: [ids] }, (err, reply) => {
    if (err) {
        console.error(err)
    } else {
        console.log('tweeted')
    }
});

stream.on('tweet', (tweet) => {
    if (tweet.in_reply_to_status_id === null && tweet.text.includes('@bottermus')) {
        onMention(tweet, T)
    } else if (tweet.in_reply_to_status_id === null && tweet.user.id_str === stokeID && tweet.retweeted_status === undefined){
        onStokeTweet(tweet, T)
    } else if (playerIDs.includes(tweet.user.id_str) && tweet.in_reply_to_status_id === null && tweet.retweeted_status === undefined) {
        onPlayerTweet(tweet, T)
    } else if (tweet.in_reply_to_status_id === null && tweet.user.id_str === championshipID && tweet.retweeted_status === undefined){
        onChampionshipTweet(tweet, T)
    }
})

console.log('Running')

app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})