$(document).ready(function() {
  var timeout = 300;
  var seconds = 1500;
  var sessionTime = 1500;
  var breakTime = 300;
  var counter = null;
  var breakCounter = null;

  $('#timer-display').text(Math.floor(seconds / 60) + ":0" + (seconds % 60));
  $("#session-display").text(Math.floor(seconds / 60));
  $('#break-display').text(Math.floor(timeout / 60));

  //controls for session time
  $('#add-time').on("click", function() {
    seconds = seconds - (seconds % 60);
    seconds += 60;
    sessionTime += 60;
    $('#timer-display').text(Math.floor(seconds / 60) + ":0" + (seconds % 60));
    $('#session-display').text(Math.floor(seconds / 60));

  })

  $('#sub-time').on("click", function() {
    seconds = seconds - (seconds % 60);
    seconds -= 60;
    sessionTime -= 60;
    $('#timer-display').text(Math.floor(seconds / 60) + ":0" + (seconds % 60));
    $('#session-display').text(Math.floor(seconds / 60));
  })

  // controls for the break time
  $('#add-break').on("click", function() {
    timeout += 60;
    breakTime += 60;
    $('#break-display').text(Math.floor(timeout / 60));
  })

  $('#sub-break').on("click", function() {
    timeout -= 60;
    breakTime -= 60;

    $('#break-display').text(Math.floor(timeout / 60));
  })

  //timer display and countdown
  $("#start").on("click", function() {

    //interval to run the countdown function
    if (breakCounter === null && seconds == 0) {
      breakCounter = setInterval(breakDown, 1000);
      clearInterval(counter);
      $("#start").text("Pause");
      $("#start").addClass("stop");
      $("#start").removeClass("start");
      $('.add').addClass("hidden");
      $('.subtract').addClass("hidden");
    } else if (counter === null && seconds > 0) {
      counter = setInterval(countDown, 1000);
      clearInterval(breakCounter);
      $("#start").text("Pause");
      $("#start").addClass("stop");
      $("#start").removeClass("start");
      $('.add').addClass("hidden");
      $('.subtract').addClass("hidden");

    } else {
      clearInterval(counter);
      clearInterval(breakCounter);
      counter = null;
      breakCounter = null;
      $("#start").text("Start");
      $("#start").addClass("start");
      $("#start").removeClass("stop");
      $('.add').removeClass("hidden");
      $('.subtract').removeClass("hidden");
    }

    //function to subtract time from the display
    function countDown() {
      seconds = seconds - 1;

      //formatting the time to display like a clock
      if ((seconds % 60) < 10 && (Math.floor(seconds / 60)) < 10) {
        $('#timer-display').text("0" + Math.floor(seconds / 60) + ":0" + (seconds % 60));
      } else if ((Math.floor(seconds / 60)) < 10) {
        $('#timer-display').text("0" + Math.floor(seconds / 60) + ":" + (seconds % 60));
      } else if ((seconds % 60) < 10) {
        $('#timer-display').text((Math.floor(seconds / 60)) + ":0" + (seconds % 60));
      } else {
        $('#timer-display').text(Math.floor(seconds / 60) + ":" + (seconds % 60));
      }

      //what to do if the time has reached zero
      if (seconds <= 0) {
        alert("Times Up!!");
        clearInterval(counter);
        counter = null;
        $('#timer-display').text("00:00");
        timeout = breakTime;
        breakCounter = setInterval(breakDown, 1000);

      }
    }
    //break timer

    function breakDown() {
      timeout = timeout - 1;

      //formatting the timeout to display like a clock
      if ((timeout % 60) < 10 && (Math.floor(timeout / 60)) < 10) {
        $('#timer-display').text("0" + Math.floor(timeout / 60) + ":0" + (timeout % 60));
      } else if ((Math.floor(timeout / 60)) < 10) {
        $('#timer-display').text("0" + Math.floor(timeout / 60) + ":" + (timeout % 60));
      } else if ((timeout % 60) < 10) {
        $('#timer-display').text((Math.floor(timeout / 60)) + ":0" + (timeout % 60));
      } else {
        $('#timer-display').text(Math.floor(timeout / 60) + ":" + (timeout % 60));
      }

      if (timeout <= 0) {
        alert("Get Started!!");
        clearInterval(breakCounter);
        breakCounter = null;
        $('#timer-display').text("00:00");
        seconds = sessionTime;
        counter = setInterval(countDown, 1000);
      }
    };
    //end break timer
  })

});