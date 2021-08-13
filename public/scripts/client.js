/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {


   //hide error messages
   $('#err1').hide();
   $('#err2').hide();

  //loop through tweets
  //then for each tweet the function createTweet is called
  //then add the new tweet- prepend
  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };

  const createTweetElement = function (tweetInfoObj) {
    const encoded = `<p class="tweet-post">${escape(tweetInfoObj.content.text)}</p>`
    const time = timeago.format(tweetInfoObj.created_at)
    const $tweet =
      `<header>
        <span><img src='${tweetInfoObj.user.avatars}'></span>
        <span class="name">${tweetInfoObj.user.name} </span>
        <span class="username">${tweetInfoObj.user.handle}</span>
        </header>
            ${encoded}
            <footer>
              <span class="days-ago"> ${time} </span>
              <div class="tweet-icons">
                <span><i class="fas fa-flag"></i></span>
                <span><i class="fas fa-retweet"></i></span>
                <span><i class="fas fa-heart"></i></span>
              </div>
            </footer>`
    return $tweet
  };



  //loads the tweets -- EDIT THIS TO MATCH VARIABLES
 const loadTweets = function () {
  $.ajax({
    method: 'GET',
    url: '/tweets/',
    dataType: 'JSON'
  }) //callback function to get the response back and iterate through the objects
    .then(function (response) {
      $('#tweets-container').empty()
      renderTweets(response)
    })
}
loadTweets();
});
