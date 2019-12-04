$(document).ready(function(){

    let currDate = new Date();

    let hour = currDate.getHours(currDate);
    console.log(hour);

    // let formTime = hour;

    // generate table to show current day's schedule
    function genTable(){

        let hourCount = (hour - 4) % 12;

        for(let i = 0; i < 12; i++){
            let tr = $("#planner").append("<tr>").attr({ "id" : i });

            let timeTag = formatTime(hourCount);

            tr.append("<td>").text(timeTag);
        }
    }

    
    // convert 0-23 to X:XX XM format
    function formatTime(h){
        let formTime = h;
        let amPM;
        if(h >= 12){
            formTime = h - 12;
            amPM = " PM";
        }else if (h < 12){
            amPM = " AM"
        }

        return formTime + amPM;
    }

    genTable();
    // populate table with events saved to local storage



    // allow user to add events to local storage


    // setTimeout() to update dynamically?



});
    
    