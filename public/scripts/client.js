/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's
 * document ready function
 */


// Most recent tweet is at the top of the page -Use prepend.
const renderTweets = function(tweets) {
  $('.tweets-container').empty();

  for (const tweet of tweets) {
    $('.tweets-container').prepend(createTweetElement(tweet));
  }
};


// Set up structure of a tweet. use time ago for the timestamp
const createTweetElement = function(tweetObj) {
  const $name = tweetObj.user.name;
  const $username = tweetObj.user.handle;
  const $text = tweetObj.content.text;
  const $daysAgo = timeago.format(tweetObj.created_at);

  //icons from fontAwesome
  const $reactionIcons = [
    $('<i>').addClass('fas fa-flag'),
    $('<i>').addClass('fas fa-retweet'),
    $('<i>').addClass('fas fa-heart')
  ];

  // create new HTML tags to contain tweet content
  const $htmlHeader = $('<header>');
  const $htmlP = $('<p>');
  const $htmlFooter = $('<footer>');
  const $htmlTweet = $('<article>');
  const $htmlIcons = $('<div>').append($reactionIcons[0], $reactionIcons[1], $reactionIcons[2]);

  $htmlHeader.append(`<p> ☺  ${$name}</p>`).append(`<p>${$username}</p>`);
  $htmlP.text($text).addClass('tweetText');
  $htmlFooter.append(`<p>${$daysAgo}</p>`);
  $htmlFooter.append($htmlIcons);

  $htmlTweet.append($htmlHeader, $htmlP, $htmlFooter);
  return $htmlTweet;
};

// Doc.ready runs when the DOM is loaded
$(document).ready(function() {

  //load previously created tweets.
  const loadTweets = function() {
    $.get("/tweets/", function(data) {
      renderTweets(data);
      console.log("Tweets were loaded.");
    });
  };
  loadTweets();

  // Add the function to the tweet button.
  $('#tweet-text').parent().submit(function(event) {
    console.log("Handler for .submit() called.");
    event.preventDefault();

    const tweetTextVal = $('#tweet-text').val();

    // for when there is an error-slidedown. empty or exceed.
    if (tweetTextVal.length === 0) {
      $('.errors').slideDown("slow");
      $('.errors').children().text('Your tweet is empty. Write something!');
    } else if (tweetTextVal.length > 140) {
      $('.errors').slideDown("slow");
      $('.errors').children().text('The character count is exceeded.');
    } else {

      const serializedData = $(this).serialize();

      $('.errors').slideUp("slow");

      $('.errors').children().text('');

      $('#tweet-text').val('');

      $('#counter').val('140');
      
      $.post('/tweets/', serializedData).then(loadTweets);
    }
  });
});

//for serialized data: slide up if there's no error, clear message when submitted, clear textarea when submitted, reset counter after submission. post gives a promise with loadtweets as the callback.
