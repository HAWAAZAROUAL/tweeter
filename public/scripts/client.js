/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// $(document).ready(function() {

// });
// loop through tweets
// then for each tweet the function createTweet is called
// then add the new tweet- prepend

const createTweetElement = function (object) {
  const name = object["name"]["name"];
  const avatar = object["user"]["avatars"];
  const handle = object["user"]["handle"];
  const content = object["content"]["text"];
  const timestamp = timeago.format(object["created_at"]);

  const tweet = $(`
    <section class= "tweet">
        <header class="header-tweet">
          <div class="tweet-header-box">
            <i class="far fa-grin-beam"></i>
            <img src=${avatar}></img>
            <p class="tweet-header-element">${name}</p>
          </div>
          <p class="tweeter-handle">${handle}</p>
        </header>
        <article class="tweet-content">${content}</article>
        <hr>
        <footer class="tweet-footer">
          <p class="tweet-date">${timestamp}</p>
          <div class="tweet-icons">
            <i class="fas fa-solid fa-flag icon-hover"></i>
            <i class="fas fa-solid fa-retweet icon-hover"></i>
            <i class="fas fa-solid fa-heart icon-hover"></i>
          </div>
        </footer>
      </section>
    `);
  return tweet;
};

// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

//   //loads the tweets -- EDIT THIS TO MATCH VARIABLES
//  const loadTweets = function () {
//   $.ajax({
//     method: 'GET',
//     url: '/tweets/',
//     dataType: 'JSON'
//   }) //callback function to get the response back and iterate through the objects
//     .then(function (response) {
//       $('#tweets-container').empty()
//       renderTweets(response)
//     })
// }
// loadTweets();
const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    $("#tweets-container").prepend(createTweetElement(tweet));
  }
  renderTweets(data);

  $("#new-tweet-form").submit(function (event) {
    event.preventDefault();
    $.post("./server/data-files/initial-tweets.json", function (data) {
      console.log(data);
    });
  });
};

// console.log($tweet); // to see what it looks like
// $(document).ready(function() {
//     $("#tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
// });
