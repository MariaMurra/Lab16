/*eslint-env browser*/

var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

var calculateDays = function () {
    "use strict";
    var event, dt, year, date, today, oneDay, days;
    
    event = $("event").value;
    dt    = $("date").value;
    
    //MAKE SURE INPUTS ARE VALID
    if (event.length === 0 || dt.length === 0) {
        $("message").innerHTML = "please enter both an event name and a date";
        return;
    }
    // MAKE SURE DATE HAS SLASHES
    if (dt.indexOf("/") === -1) {
        $("message").innerHTML = "please enter the date in MM/DD/YYYY format";
        return;
    }
    
    // MAKE SURE DATE STRING HAS 4-DIGIT YEAR
    year = dt.substring(dt.length - 4);
    if (isNaN(year)) {
        $("message").innerHTML = "please enter the date in MM/DD/YYYY format";
        return;
    }
    //CONVER DATE TO DATE OBJECT AND MAKE SURE IT IS VALID
    date = new Date(dt);
    if (date === "invalid Date") {
        $("message").innerHTML = "please enter the date in MM/DD/YYYY format";
        return;
    }
    
    //CALCULATE DAYS
    today = new Date();
    oneDay = 24 * 60 * 60 * 1000;
    days = (date.getTime() - today.getTime()) / oneDay;
    days = Math.ceil(days);
    
    //CREATE AND DISPLAY MESSAGE
    if (days === 0) {
        $("message").innerHTML = "Today is" + event + "." + date.toDateString();
    }
    
    if (days < 0) {
        $("message").innerHTML = "You are late! " + event + " happened on " + date.toDateString() + ",  " + Math.abs(days) + " days ago.";
    }
    if (days > 0) {
        $("message").innerHTML = days + " days until " +  event;
    }
};

window.addEventListener("load", function () {
    "use strict";
    $("countdown").addEventListener("click", calculateDays);
});