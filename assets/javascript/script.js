$(document).ready(function(){

    let currDate = new Date();

    let hour = currDate.getHours(currDate);
    console.log(hour);

    // generate table to show current day's schedule
    function genTable(){

        let hourCount = (hour - 4) % 24;

        for(let i = 0; i < 12; i++){
            let tr = $("<tr></tr>").attr({ "id" : i});
            $("#planner").append(tr);

            

            let timeTag = formatTime(hourCount);

            let td = $("<td></td>").text(timeTag);
            tr.append(td);

            hourCount = (hourCount + 1) % 24;
            console.log(i + " " + hourCount + " " + timeTag);

        }
    }

    
    function formatTime(h){
        let formTime = h;
        let amPM = " AM";

        if(h >= 12){
            formTime = h - 12;
            amPM = " PM";
        }else if (h < 12){
            amPM = " AM"
        }

        if(formTime == 0){
            formTime = 12;
        }

        return formTime + amPM;
    }

    genTable();
    // populate table with events saved to local storage



    // allow user to add events to local storage


    // setTimeout() to update dynamically?



});
    
    