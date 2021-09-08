//Parse retrieved [databasetime] text as a Date Object
let finsihtime = new Date(databasetime);

///Upload function is in line 69

//===code that became obsolete since for some reason===
//let uploadbtn = document.getElementById('upload-label');
//let uploadStyle = window.getComputedStyle(uploadbtn, "");
//let uploadBG = uploadStyle.getPropertyValue("background-color");
//if (uploadBG === "rgb(0, 0, 255)")      <--suddenly stopped working and made this whole group obsolete
//if (uploadBG === "rgb(128, 128, 128)")  <--suddenly stopped working and made this whole group obsolete
//console.log(uploadBG)


//==================Hover effects for==================
//====================upload button====================
document.getElementById("upload-label").onmouseover = function() { mouseOver() };

function mouseOver() {
    if (uploadState == 1) {
        document.getElementById("upload-label").style.backgroundColor = "rgb(42, 0, 192)";
    } else if (uploadState == 0) {
        document.getElementById("upload-label").style.backgroundColor = "rgb(85, 85, 85)";
    }

}

document.getElementById("upload-label").onmouseout = function() { mouseOut() };

function mouseOut() {
    if (uploadState == 1) {
        document.getElementById("upload-label").style.backgroundColor = "blue";
    } else if (uploadState == 0) {
        document.getElementById("upload-label").style.backgroundColor = "rgb(128, 128, 128)";
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
let defaulttime = new Date(Date.UTC(pYear, pMonth, pDay, pHour + 1, pMin, pSec, pMill)); //(add hours to current time)

console.log("Current: " + phtime);
console.log("MAX: " + maxtime);
console.log("End Time: " + finsihtime);

//===================================Upload Button===================================
function upload() {
    if (uploadState == 0) {
        alert("You can't upload yet.");
    } else if (uploadState == 1) {
        document.getElementById("timeLeftUploadIn").value = defaulttime.toString(); //type: text //Reset deadline to 1h from current time (using worldtimeapi.org)
    }
}

//==========Updates ok/notok visualiser bar and upload button every click==========
function updatebar() {
    total = ok + notok;
    let percent = ((ok / total) * 100).toFixed();
    document.getElementById("okay").style.width = percent + "%";
    //Debug stuff
    console.log('Ok Percentage: ' + percent + "%");
    console.log('Total Reactions: ' + total);
    // console.log('updatebar finish: ' + finsihtime);
}

//Increment Ok/Not Ok & set deadline (keep passing selector until it reaches [else statement of total > 24] or maxtrigger functions)
function addDel(selector) {
    total = ok + notok;
    let percent = ((ok / total) * 100).toFixed();
    if (total >= 24) { //This is set to [>= 24] so that it runs just before a total of 25 (kinda giving the ilusion that it ran when reaching 25)
        if ((total - 24) % 15 === 0) { //This is set to [total - 24] so that it runs just before every 15 reactions after 25: [39, 54, 69, 84, ...] (kinda giving the ilusion that it ran when reaching every 15 reactions)
            if (percent <= 14) {
                delHr(24);
                console.log("Removed time");
                maxtriggerDel(selector);
            } else if (percent <= 25) {
                delHr(1.5);
                console.log("Removed 1.5 hrs");
                maxtriggerDel(selector);
            } else if (percent <= 34) {
                delHr(.5);
                console.log("Removed 30 mins");
                maxtriggerDel(selector);
            } else if (percent <= 65) {
                console.log("Time stays the same");
                // But will still increment [ok/notok]
                if (selector == 'ok') {
                    document.getElementById("timeFormOk").submit();
                } else if (selector == 'nk') {
                    document.getElementById("timeFormNotOk").submit();
                }
            } else if (percent <= 75) {
                addHr(.5);
                console.log("Added .5 hrs");
                maxtriggerAdd(selector);
            } else if (percent <= 85) {
                addHr(1.5);
                console.log("Added 1.5 hrs");
                maxtriggerAdd(selector);
            } else if (percent <= 100) {
                addHr(2.5);
                console.log("Added 2.5 hrs");
                maxtriggerAdd(selector);
            }
        } else { //Enable incrementing ok/not ok inbetween every 15 reactions [24 reactions and above]
            if (selector == 'ok') {
                document.getElementById("timeFormOk").submit(); //Increment Ok count
            } else if (selector == 'nk') {
                document.getElementById("timeFormNotOk").submit(); //Increment Not Ok count
            }
        }
    } else { //Enable incrementing ok/not ok prior to 24 reactions
        if (selector == 'ok') {
            document.getElementById("timeFormOk").submit(); //Increment Ok count
        } else if (selector == 'nk') {
            document.getElementById("timeFormNotOk").submit(); //Increment Not Ok count
        }
    }

    function maxtriggerAdd(selector) {
        if (finsihtime.getUTCHours() > 15) { //sets finish time to the max when reached (15+8 = 23 for GMT+8)
            console.log("Maximum time reached.");
            finsihtime.setTime(maxtime.getTime()); //Will always set it to the limit no matter how much is added.
            document.getElementById("timeLeftInputOk").value = finsihtime.toString(); //type: text //Set Ok button form time to the maximum
            document.getElementById("timeLeftInputNotOk").value = finsihtime.toString(); //type: text //Set Not Ok button form time to the maximum
            console.log("MAX: " + maxtime);
            console.log("End Time: " + finsihtime);
        }
        if (selector == 'ok') {
            document.getElementById("timeFormOk").submit(); //Increment Ok count
        } else if (selector == 'nk') {
            document.getElementById("timeFormNotOk").submit(); //Increment Not Ok count
        }
    }

    function maxtriggerDel(selector) {
        if (finsihtime.getUTCHours() > 15) { //instead of seting finish time to the max, nothing happens
            console.log("Maximum time reached but some time removed.");
        }
        console.log("MAX: " + maxtime);
        console.log("End Time: " + finsihtime);
        if (selector == 'ok') {
            document.getElementById("timeFormOk").submit(); //Increment Ok count
        } else if (selector == 'nk') {
            document.getElementById("timeFormNotOk").submit(); //Increment Not Ok count
        }
    }

}

//=========================Add-Subtract Hours=========================
function addHr(h) { //usage: addHr(hour)
    finsihtime.setTime(finsihtime.getTime() + (h * 60 * 60 * 1000)); //Add h hours
    document.getElementById("timeLeftInputOk").value = finsihtime.toString(); //type: text //Add h hours to Ok button form time
    document.getElementById("timeLeftInputNotOk").value = finsihtime.toString(); //type: text //Add h hours to Not Ok button form time
}

function delHr(h) { //usage: delHr(hour)
    finsihtime.setTime(finsihtime.getTime() - (h * 60 * 60 * 1000)); //Remove h hours
    document.getElementById("timeLeftInputOk").value = finsihtime.toString(); //type: text //Remove h hours to Ok button form time
    document.getElementById("timeLeftInputNotOk").value = finsihtime.toString(); //type: text //Remove h hours to Not Ok button form time
}

//===================================Upload Countdown===================================
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
        //console.log(t.millisec); (this was for debugging)
        if (t.millisec <= 0) { //stop timer at end
            document.getElementById('time').innerHTML = "You can upload now";
            document.getElementById('upload-label').style.backgroundColor = "blue";
            document.getElementById('text').style.padding = "0 35px";
            document.getElementById('icon').style.padding = "0 15px";
            clearInterval(timeinterval);
            if (uploadState == 0) {
                document.getElementById("uploadState").value = 1; //type: int //Set Upload State to [1=Enabled] if Disabled
                document.getElementById("uploadStateForm").submit(); //Submit to database
            }
        } else if (t.millisec > 3600000) {
            document.getElementById('time').innerHTML = 'Time left: ' + t.hour + 'hrs ' + t.minute +
                'min ' + t.seconds + 'sec';
            document.getElementById('text').style.padding = "0 15px";
            document.getElementById('icon').style.padding = "0 15px";
        } else if (t.millisec > 60000) {
            document.getElementById('time').innerHTML = 'Time left: ' + t.minute +
                'min ' + t.seconds + 'sec';
            document.getElementById('text').style.padding = "0 15px";
            document.getElementById('icon').style.padding = "0 15px";
        } else if (t.millisec > 1000) {
            document.getElementById('time').innerHTML = 'Time left: ' + t.seconds + 'sec';
            document.getElementById('text').style.padding = "0 15px";
            document.getElementById('icon').style.padding = "0 15px";
        }
    }, 1000);
}

//Debug
console.log('ok: ' + ok);
console.log('notok: ' + notok);
console.log('uploadState: ' + uploadState);
console.log('finishtime: ' + finsihtime);
console.log('image: url("../media/' + image + '")');
console.log(document.getElementById("timeLeftInputOk").value);

//Run JavaScript
updatebar(); //Update Ok/NotOk Visualiser Bar
document.getElementById('image').style.backgroundImage = 'url("../media/' + image + '")'; //Load Database Image
runtimer(finsihtime); //Load timer