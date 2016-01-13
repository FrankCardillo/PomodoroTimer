$(document).ready(function() {
  /* boolean to determine whether or not the user has started a work session */
  var workSession;
  
  /* Starts the timer. Uses setInterval to update the timer every second, creates a timer with the format MM : SS and updates them each second. This timer cannot be paused. If the user tries to set a new timer while this timer is running that will not work either. This is a pretty mediocre timer, but at least it's accurate. */
  $("#start").click(function() {
    var myTime = 60 * document.getElementById("timerFace").textContent;
    var myInterval = setInterval(function() {
      var minutes = parseInt(myTime / 60, 10);
      var seconds = parseInt(myTime % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      document.getElementById("timerFace").textContent = minutes + ":" + seconds;

      if (--myTime < 0) {
        document.getElementById("timerFace").textContent = "Time's Up!";
        var wav = 'http://www.oringz.com/oringz-uploads/sounds-792-the-little-dwarf.mp3';
        var audio = new Audio(wav);
        audio.play();
        
        /* Diana wanted a counter to keep track of the number of work sessions she had completed in one sitting */
        if (workSession === true) {
          document.getElementById("timesUsed").textContent = Number(document.getElementById("timesUsed").textContent) + 1;
        }
        clearInterval(myInterval);
      }
    }, 1000);
    $(this).prop("disabled", true);
  });

  /* Populates the timer face with the time specified in the work session setting */
  $('#work').click(function() {
    workSession = true;
    document.getElementById("start").disabled = false;
    document.getElementById("timerFace").textContent = document.getElementById("work").textContent;
  });

  /* Populates the timer face with the time specified in the break session setting */
  $('#break').click(function() {
    workSession = false;
    document.getElementById("start").disabled = false;
    document.getElementById("timerFace").textContent = document.getElementById("break").textContent;
  });

  // Adds one to the break session time setter 
  $('#breakP').click(function() {
    var num = Number(document.getElementById("break").textContent);
    var num2 = num + 1;
    document.getElementById("break").textContent = num2;
  });

  // Subtracts one from the break session time setter 
  $('#breakM').click(function() {
    var num = Number(document.getElementById("break").textContent);
    var num2 = num - 1;
    if (num2 > 0) {
      document.getElementById("break").textContent = num2;
    } else {
      document.getElementById("break").textContent = 0;
    }
  });

  // Adds one to the work session time setter 
  $('#workP').click(function() {
    var num = Number(document.getElementById("work").textContent);
    var num2 = num + 1;
    document.getElementById("work").textContent = num2;
  });

  // Subtracts one from the work session time setter 
  $('#workM').click(function() {
    var num = Number(document.getElementById("work").textContent);
    var num2 = num - 1;
    if (num2 > 0) {
      document.getElementById("work").textContent = num2;
    } else {
      document.getElementById("work").textContent = 0;
    }
  });
});