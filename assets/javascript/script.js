$(document).ready(function () {

    let currDate = new Date();

    let formDate = currDate.toString("dddd, MMMM dS, yyyy");

    $("#currentDay").text(formDate);

    let hour = currDate.getHours(currDate);


    // generate table to show current day's schedule
    // style past/current/future hours
    function genTable() {

        let hourCount = (hour - 4) % 24;
        let timeStyle;

        for (let i = 0; i < 12; i++) {
            let tr = $("<tr></tr>").attr({
                "id": i
            });
            $("#planner").append(tr);

            let timeTag = formatTime(hourCount);

            let timeCol = $("<td></td>").text(timeTag);
            timeCol.attr({"class":"hour"});

            tr.append(timeCol);

            // console.log(i + " " + hourCount + " " + timeTag);

            let noteCol = $("<td></td>").text(getNotes());
            
            if(i < 4){
                timeStyle = "past";
            }else if (i == 4){
                timeStyle = "present";
            }else{
                timeStyle = "future";
            }

            noteCol.attr({"class":timeStyle});

            hourCount = (hourCount + 1) % 24;

            tr.append(noteCol);

            //add button w/ event listener
            let addCol = $("<td></td>");
            let addButt = $("<button></button>").text("Edit Notes");
            addButt.attr({"class":"saveBtn"});

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
    function getNotes(){
        return "I am placeholder text";
    }

    // allow user to add events to local storage
    function addNotes(){
        console.log("add notes");
        // let test = this.parent().parent().attr("id");
        // console.log(test);
    }


    // setTimeout() to update dynamically?




});