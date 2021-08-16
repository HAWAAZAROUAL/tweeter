

$(document).ready(function() {

  // make a reference to the textarea. initiate keyup event.
  const $textArea = $("#tweet-text");
  $textArea.on('keyup', function() {

    // track the characters used.
    let $counter = $('#counter');
    $counter.val(140 - this.value.length);

    // no characters- make the counter red - use addClass
    if ($counter.val() < 0) {
      $counter.addClass('no-more-chars');
    } else {
      $counter.removeClass('no-more-chars');
    }
  });
});