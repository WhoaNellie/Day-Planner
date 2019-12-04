$(document).ready(function () {

    let currDate = new Date();

    let formDate = currDate.toString("dddd, MMMM dS, yyyy");

    $("#currentDay").text(formDate);

    let hour = currDate.getHours(currDate);


    // generate table to show current day's schedule
    function genTable() {

        // why doesn't modulo deal with negatives
        let hourCount = (((hour - 3) % 24) + 24) % 24;
        console.log(hourCount);
        let timeStyle;

        for (let i = -3; i < 9; i++) {
            let tr = $("<tr></tr>");
            $("#planner").append(tr);

            let timeTag = formatTime(hourCount);

            let timeCol = $("<td></td>").text(timeTag);
            timeCol.attr({
                "class": "hour"
            });

            tr.append(timeCol);

            let noteCol = $("<td></td>");

            if (i < 0) {
                timeStyle = "past";
            } else if (i == 0) {
                timeStyle = "present";
            } else {
                timeStyle = "future";
            }

            let txtArea = $("<textarea></textarea>").attr({
                "id": i,
                "class": timeStyle
            });

            txtArea.val(getNotes(i));

            hourCount = (hourCount + 1) % 24;

            tr.append(noteCol);
            noteCol.append(txtArea);

            let addCol = $("<td></td>");
            let addButt = $("<button></button>").text("Save");
            addButt.attr({
                "class": "saveBtn",
                "tied": i
            });

            tr.append(addCol);
            addCol.append(addButt);

            addButt.on("click", addNotes);

        }
    }

    // find a way to do this with date.js?
    function formatTime(h) {
        let formTime = h;
        let amPM = " AM";

        if (h >= 12) {
            formTime = h - 12;
            amPM = " PM";
        } else if (h < 12) {
            amPM = " AM"
        }

        if (formTime == 0) {
            formTime = 12;
        }

        return formTime + amPM;
    }

    genTable();


    // populate table with events saved to local storage
    function getNotes(i) {

        let getDate = currDate.toString("ddMMyyyy");

        let getHour = Number(hour) + Number(i);
        console.log(getHour + " " + i);
        getHour = ((((getHour) % 24) + 24) % 24);
        console.log(getHour);
        
        let getID = JSON.stringify(getDate + getHour);
        console.log(getID);

        return localStorage.getItem(getID);
    }

    // allow user to add events to local storage
    function addNotes() {
        let select = $(this).attr("tied");

        // is there a less jank way to do this?
        let note = $("#"+select).val();

        let numDate = currDate.toString("ddMMyyyy");
        let numHour = Number(hour) + Number(select);
        numHour = ((((numHour) % 24) + 24) % 24);


        let noteID = numDate + numHour;

        localStorage.setItem(JSON.stringify(noteID), note);
    }


    // setTimeout() to update dynamically?


});