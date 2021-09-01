let ok = 0;
let notok = 0;
let uploadState = 0; // 0-> grey (disabled) 1-> (enabled)

//3 Button Functions

function okcount() { //OK Button
    document.getElementById('ok-num').innerHTML = ++ok;
    updatebar();
}

function notokcount() { //NOT OK Button
    document.getElementById('nk-num').innerHTML = ++notok;
    updatebar();
}

function upload() { //Upload Button
    if (uploadState === 0) {
        alert("You can't upload yet.");
    } else {
        alert("Upload button was pressed, but upload isn't implemented yet.");
    }
}

//===code that became obsolete since for some reason===
//let uploadbtn = document.getElementById('upload-color');
//let uploadStyle = window.getComputedStyle(uploadbtn, "");
//let uploadBG = uploadStyle.getPropertyValue("background-color");
//if (uploadBG === "rgb(0, 0, 255)")      <--suddenly stopped working and made this whole group obsolete
//if (uploadBG === "rgb(128, 128, 128)")  <--suddenly stopped working and made this whole group obsolete
//console.log(uploadBG)


//==================Hover effects for==================
//====================upload button====================
document.getElementById("upload-color").onmouseover = function() { mouseOver() };

function mouseOver() {
    if (uploadState === 1) {
        document.getElementById("upload-color").style.backgroundColor = "rgb(42, 0, 192)";
    } else if (uploadState === 0) {
        document.getElementById("upload-color").style.backgroundColor = "rgb(85, 85, 85)";
    }

}

document.getElementById("upload-color").onmouseout = function() { mouseOut() };

function mouseOut() {
    if (uploadState === 1) {
        document.getElementById("upload-color").style.backgroundColor = "blue";
    } else if (uploadState === 0) {
        document.getElementById("upload-color").style.backgroundColor = "rgb(128, 128, 128)";
    }

}
//XMLHttpRequest using jQuery's Ajax to get Philippine Internet time (GMT+8) instead of relying on the local computer's time.

let phtimejson;
$.ajax({
    async: false, //enabling sync on't allow me to retreive a variable.
    dataType: "json",
    url: "https://worldtimeapi.org/api/timezone/Asia/Manila",
    success: function(data) { phtimejson = data.datetime; }
});

//new Date(year, month, day, hours, minutes, seconds, milliseconds)
//console.log(phtimejson);

let phtime = new Date(phtimejson);
let pYear = phtime.getUTCFullYear();
let pMonth = phtime.getUTCMonth();
let pDay = phtime.getUTCDate();
let pHour = phtime.getUTCHours();
let pMin = phtime.getUTCMinutes();
let pSec = phtime.getUTCSeconds();
let pMill = phtime.getUTCMilliseconds();

let maxtime = new Date(Date.UTC(pYear, pMonth, pDay, 15, 59, 59, 999)); //15+8 = 23 for GMT+8
let finsihtime = new Date(Date.UTC(pYear, pMonth, pDay, pHour + 1, pMin, pSec, pMill)); //(add hours to it)

console.log("Current: " + phtime);
console.log("MAX: " + maxtime);
console.log("End Time: " + finsihtime);


//updates bar and upload button every click
function updatebar() {
    total = ok + notok;
    let percent = ((ok / total) * 100).toFixed();
    document.getElementById("okay").style.width = percent + "%";
    console.log(percent + "%");
    console.log(total);

    //addMin(30);
    if (total > 24) {
        if ((total - 25) % 15 === 0) {
            if (percent <= 14) {
                delHr(24);
                console.log("Removed time");
                maxtriggerDel();
            } else if (percent <= 25) {
                delHr(1.5);
                console.log("Removed 1.5 hrs");
                maxtriggerDel();
            } else if (percent <= 34) {
                delHr(.5);
                console.log("Removed 30 mins");
                maxtriggerDel();
            } else if (percent <= 65) {
                console.log("Time stays the same"); //nothing happens
            } else if (percent <= 75) {
                addHr(.5);
                console.log("Added .5 hrs");
                maxtriggerAdd();
            } else if (percent <= 85) {
                addHr(1.5);
                console.log("Added 1.5 hrs");
                maxtriggerAdd();
            } else if (percent <= 100) {
                addHr(2.5);
                console.log("Added 2.5 hrs");
                maxtriggerAdd();
            }
        }
    }

    function maxtriggerAdd() {
        if (finsihtime.getUTCHours() > 15) { //sets finish time to the max when reached (15+8 = 23 for GMT+8)
            console.log("Maximum time reached.");
            finsihtime.setTime(maxtime.getTime()); //Will always set it to the limit no matter how much is added.
            //finsihtime = maxtime;
        }
        console.log("MAX: " + maxtime);
        console.log("End Time: " + finsihtime);
    }

    function maxtriggerDel() {
        if (finsihtime.getUTCHours() > 15) { //sets finish time to the max when reached (15+8 = 23 for GMT+8)
            console.log("Maximum time reached but some time removed.");
        }
        console.log("MAX: " + maxtime);
        console.log("End Time: " + finsihtime);
    }
}

//=========================Add-Subtract Hours=========================
function addHr(h) { //usage: addHr(hour)
    finsihtime.setTime(finsihtime.getTime() + (h * 60 * 60 * 1000));
}

//function addMin(m) { //usage: addMin(mins)
//    finsihtime.setTime(finsihtime.getTime() + (m * 60 * 1000));
//}

function delHr(h) { //usage: delHr(hour)
    finsihtime.setTime(finsihtime.getTime() - (h * 60 * 60 * 1000));
}

//function delMin(m) { //usage: delMin(mins)
//    finsihtime.setTime(finsihtime.getTime() - (m * 60 * 1000));
//}


//Upload Countdown
function getTimeRemaining(timeup) {
    const millisec = Date.parse(timeup) - new Date().getTime();
    const seconds = Math.floor((millisec / 1000) % 60);
    const minute = Math.floor((millisec / 1000 / 60) % 60);
    const hour = Math.floor((millisec / (1000 * 60 * 60)) % 24);

    return { millisec, hour, minute, seconds };
}

function runtimer(timeup) {
    const timeinterval = setInterval(function() { //start timer
        const t = getTimeRemaining(timeup);
        console.log(t.millisec);
        if (t.millisec <= 0) { //stop timer at end
            document.getElementById('time').innerHTML = "You can upload now";
            document.getElementById('upload-color').style.backgroundColor = "blue";
            document.getElementById('text').style.padding = "0 35px";
            document.getElementById('icon').style.padding = "0 15px";
            uploadState = 1; //enable upload
            clearInterval(timeinterval);
        } else if (t.millisec > 3600000) {
            uploadState = 0; //disable upload if there's still time left (for refresh)
            document.getElementById('time').innerHTML = 'Time left: ' + t.hour + 'hrs ' + t.minute +
                'min ' + t.seconds + 'sec';
            //document.getElementById('upload-color').style.backgroundColor = "grey";
            document.getElementById('text').style.padding = "0 15px";
            document.getElementById('icon').style.padding = "0 15px";
        } else if (t.millisec > 60000) {
            uploadState = 0; //disable upload if there's still time left (for refresh)
            document.getElementById('time').innerHTML = 'Time left: ' + t.minute +
                'min ' + t.seconds + 'sec';
            //document.getElementById('upload-color').style.backgroundColor = "grey";
            document.getElementById('text').style.padding = "0 15px";
            document.getElementById('icon').style.padding = "0 15px";
        } else if (t.millisec > 1000) {
            uploadState = 0; //disable upload if there's still time left (for refresh)
            document.getElementById('time').innerHTML = 'Time left: ' + t.seconds + 'sec';
            //document.getElementById('upload-color').style.backgroundColor = "grey";
            document.getElementById('text').style.padding = "0 15px";
            document.getElementById('icon').style.padding = "0 15px";
        }
    }, 1000);
}

runtimer(finsihtime);