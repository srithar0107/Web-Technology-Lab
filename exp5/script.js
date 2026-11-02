
/* EXPERIMENT 5: JAVASCRIPT DOM ELEMENTS AND EVENTS */


/* 1. LEARN MORE BUTTON */

var learnButton = document.getElementById("learn-more-button");

learnButton.addEventListener("click", function () {

    document.getElementById("project-message").innerHTML =
        "We design modern homes, offices, and commercial spaces!";

});


/* 2. SERVICE CARD CLICK EVENTS */

var services = document.querySelectorAll(".service-box");

services.forEach(function (service) {

    service.addEventListener("click", function () {

        var serviceName = service.querySelector("h3").innerHTML;

        document.getElementById("service-message").innerHTML =
            "You selected our " + serviceName + " service.";

    });

});


/* 3. PROJECT TABLE CLICK EVENTS */

var projectRows = document.querySelectorAll(".project-row");

projectRows.forEach(function (row) {

    row.style.cursor = "pointer";

    row.addEventListener("click", function () {

        var projectName = row.getAttribute("data-project");
        var location = row.getAttribute("data-location");

        document.getElementById("project-details").innerHTML =
            "Selected Project: " + projectName +
            " | Location: " + location;

    });

});


/* 4. SIGN-IN FORM EVENT */

document.getElementById("login-form").addEventListener("submit", function (event) {

    event.preventDefault();

    alert("Sign-in form submitted successfully for demonstration.");

});


/* 5. SIGN-UP FORM EVENT */

document.getElementById("signup-form").addEventListener("submit", function (event) {

    event.preventDefault();

    var name = document.getElementById("full-name").value;

    alert("Thank you, " + name + "! Your registration form is valid.");

});
