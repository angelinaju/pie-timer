var timer;
var timerCurrent;
var timerFinish;
var timerSeconds;
var timerColor;
var timings = ["4","60","30"]
var timingIndx = 0;


function drawTimer(percent) {

    $('div.timer').html('<div class="percent"></div><div id="slice"' + 
        (percent > 50 ? ' class="gt50"' : '') + '><div class="pie"></div>' + (percent > 50 ? '<div class="pie fill"></div>' : '') + '</div>');

    var deg = 360 * (percent / 100);

    $('#slice .pie').css({

        '-moz-transform': 'rotate(' + deg + 'deg)',

        '-webkit-transform': 'rotate(' + deg + 'deg)',

        '-o-transform': 'rotate(' + deg + 'deg)',

        'transform': 'rotate(' + deg + 'deg)',

        'border-color': timerColor

    });

    $('#slice .pie').css({
        'background-color': timerColor 
    });

    $('.percent').html(Math.round(percent) + '%');

}

function stopWatch() {

    var seconds = (timerFinish - (new Date().getTime())) / 1000;

    if (seconds <= 0) {

        drawTimer(100);

        clearInterval(timer);

        console.log('timer has finished');
        timingIndx++;
        if(timingIndx < timings.length){
            startTimer(timings[timingIndx]);
        }
    } else {


        var percent = (seconds / timerSeconds) * 100;

        drawTimer(percent);

    }

}

function getColor(seconds) {

    if (seconds <= 10) {
        return '#FF0000';
    } else if (seconds <= 20) {
        return '#FFA500';
    } else if (seconds <= 30) {
        return '#FFFF00';
    } else {
        return '#00FF00';
    }
}

$(document).ready(function () {
    const velProg = document.querySelectorAll('.velProg');

    function velToIndex(velocity){
        switch(true){
            case (velocity < 5):
            return 0;
            break;
            case (velocity < 10):
            return 1;
            break; 
            case (velocity < 15):
            return 2;
            break;
            case (velocity < 20):
            return 3;
            break;
            case (velocity < 25):
            return 4;
            break;
            case (velocity < 30):
            return 5;
            break;
            case (velocity < 35):
            return 6;
            break;
            case (velocity >= 45):
            return 7
            break;

        }

        
    }
    startTimer = function (seconds) {
            timerSeconds = seconds;
            timerColor = getColor(timerSeconds);

            $('.timer').css('border-color', timerColor);
            $('.timer .pie').css('border-color', timerColor);
            $('.timer .pie.fill').css('background-color', timerColor);

            timerCurrent = 0;

            timerFinish = new Date().getTime() + (timerSeconds * 1000);

            timer = setInterval(stopWatch, 50);
    }

    function start(){
        
    }
    
    // start();
    startTimer(timings[timingIndx]);
});

