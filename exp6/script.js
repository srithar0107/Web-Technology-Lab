
/* EXPERIMENT 6: JAVASCRIPT STYLES AND ANIMATIONS */


/* 1. CHANGE TITLE STYLE */

function changeStyle() {
    var title = document.getElementById("main-title");

    title.style.color = "#ffe066";
    title.style.fontSize = "48px";
    title.style.backgroundColor = "#00334d";
    title.style.padding = "10px";
}


/* 2. CHANGE TEXT STYLE */

function changeMessageStyle() {
    var message = document.getElementById("style-message");

    message.style.color = "#0074bd";
    message.style.fontSize = "24px";
    message.style.fontWeight = "bold";
    message.style.backgroundColor = "#e8f3f5";
}


/* 3. HIDE TEXT */

function hideText() {
    document.getElementById("hide-message").style.display = "none";
}


/* 4. SHOW TEXT */

function showText() {
    document.getElementById("hide-message").style.display = "block";
}


/* 5. DATE AND TIME USING DATE OBJECT */

function updateDateTime() {
    var now = new Date();

    document.getElementById("date-display").innerHTML =
        "Date: " + now.getDate() + "/" +
        (now.getMonth() + 1) + "/" +
        now.getFullYear();

    document.getElementById("time-display").innerHTML =
        "Time: " + now.toLocaleTimeString();
}

updateDateTime();


// Update the displayed time every second
var clockTimer = setInterval(updateDateTime, 1000);


/* 6. SETINTERVAL AND CLEARINTERVAL */

var timerCount = 0;
var timerVariable = null;

function startTimer() {
    if (timerVariable !== null) {
        return;
    }

    timerCount = 0;

    document.getElementById("timer-message").innerHTML =
        "Timer started: 0 seconds";

    timerVariable = setInterval(function () {
        timerCount++;

        document.getElementById("timer-message").innerHTML =
            "Timer running: " + timerCount + " seconds";
    }, 1000);
}

function stopTimer() {
    if (timerVariable !== null) {
        clearInterval(timerVariable);
        timerVariable = null;

        document.getElementById("timer-message").innerHTML =
            "Timer stopped at " + timerCount + " seconds.";
    }
}


/* 7. SETTIMEOUT */

var delayedTimer = null;

function showDelayedMessage() {
    if (delayedTimer !== null) {
        clearTimeout(delayedTimer);
    }

    document.getElementById("timer-message").innerHTML =
        "Your message will appear after 2 seconds...";

    delayedTimer = setTimeout(function () {
        document.getElementById("timer-message").innerHTML =
            "Welcome to Elite Architectural Firm!";

        delayedTimer = null;
    }, 2000);
}


/* 8. BUILDING ANIMATION USING SETINTERVAL */

var animationTimer = null;
var buildingPosition = 0;
var movingRight = true;

function startAnimation() {
    if (animationTimer !== null) {
        return;
    }

    var building = document.getElementById("moving-building");
    var container = document.getElementById("animation-container");

    animationTimer = setInterval(function () {
        var maxPosition = container.clientWidth - building.offsetWidth;

        if (buildingPosition >= maxPosition) {
            movingRight = false;
        }

        if (buildingPosition <= 0) {
            movingRight = true;
        }

        if (movingRight) {
            buildingPosition += 2;
        } else {
            buildingPosition -= 2;
        }

        building.style.left = buildingPosition + "px";
    }, 20);
}

function stopAnimation() {
    if (animationTimer !== null) {
        clearInterval(animationTimer);
        animationTimer = null;
    }
}
