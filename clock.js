function clock(){
    const fullDate = new Date();
    var dow = new Array();
    dow[0] = "Sunday";
    dow[1] = "Monday";
    dow[2] = "Tuesday";
    dow[3] = "Wednesday";
    dow[4] = "Thursday";
    dow[5] = "Friday";
    dow[6] = "Saturday";
    var d = dow[fullDate.getDay()];
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "Novemeber";
    month[11] = "December";
    var m = month[fullDate.getMonth()];
    var day = fullDate.getDate();
    var hours = fullDate.getHours();
    var mins = fullDate.getMinutes();

    if (hours < 10){
        hours = "0" + hours;
    }

    if (mins < 10) {
        mins = "0" +mins;
    }

    document.getElementById('dow').innerHTML = d + ",";
    document.getElementById('month').innerHTML = m;
    document.getElementById('day').innerHTML = day;
    document.getElementById('hour').innerHTML = hours + " :";
    document.getElementById('minute').innerHTML = mins;

    if (hours > 19 || hours < 7){
        document.body.style.background ='linear-gradient(rgb(89,0,179), rgb(38,0,77))';
    }
}

setInterval(clock, 1000);