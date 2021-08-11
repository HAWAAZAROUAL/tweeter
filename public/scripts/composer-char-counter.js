// //for character count
// $(document).ready(function() {
//   // --- our code goes here ---
// });
// console.log(document).ready

$(document).ready(function() {

  // create reference to the textarea
  const $textArea = $("#tweet-text");

  // fire keyup event when user types in the textarea
  $textArea.on('keyup', function() {

    // update counter to show remaining characters
    let $counter = $('#counter');
    $counter.val(140 - this.value.length);

      // if user has no characters left, add class to make the counter text red
      if ($counter.val() <= 0) {
        $counter.addClass('no-more-chars');
      } else {
        // revert counter text to normal colour if user deletes enough characters
        $counter.removeClass('no-more-chars');
      }      
  });


});