//for character count
$(document).ready(function () {
  // console.log("ready");
  // const counter = $(".counter");

  //use keyup to track characters pressed
  $("#tweet-text").on("keyup", function () {
    const counter = $("this").siblings(".tweeter-submit-counter").children(".counter")
    counter.val(140 - $(this).val().length);
  
    if (!counter.hasClass("too-much-text") && counter.val() < 0) {
      counter.addClass("too-much-text");
    } else if (counter.hasClass("too-much-text") && counter.val() >0){
      counter.removeClass("too-much-text");
    }
  });

  });
