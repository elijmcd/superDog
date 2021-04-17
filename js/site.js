let eventArray = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019"
    }
];

// Defaults to All Events
var filteredEvents = eventArray;

// Setting up the selector for individual cities
function buildDropDown() {
    let eventDD = document.getElementById("eventDropDown");
    //
    let distinctEvents = [...new Set(eventArray.map((event) => event.city))];
    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All" >All</a>';
    resultsHTML = "";

    for (let i = 0; i < distinctEvents.length; i++) {

        resultsHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
    }

    resultsHTML += linkHTMLEnd;
    eventDD.innerHTML = resultsHTML;

    displayStats();
}

function displayStats() {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let i = 0; i < filteredEvents.length; i++) {
        currentAttendance = filteredEvents[i].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }

        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }
    }

    average = total / filteredEvents.length;
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least//.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }
    );
}

function getEvents(element) {
    let city = element.getAttribute("data-string");
    let curEvents = JSON.parse(localStorage.getItem("eventArray")) || eventArray;

    filteredEvents = curEvents;
    document.getElementById("statsHeader").innerHTML = `Stats For ${city} Events`;
    if (city != "All") {
        filteredEvents = curEvents.filter(function (event) {
            if (event.city == city) {
                return event;
            }
        });
    }
    displayStats();
}

loadEventList();

function loadEventList() {
    let eventList = [];
    eventList = getData();
    displayData(eventList);
}

function getData() {
    let eventList = JSON.parse(sessionStorage.getItem("eventArray")) || [];

    if (eventList.length == 0) {
        eventList = eventArray;
        sessionStorage.setItem("eventArray", JSON.stringify(eventList));
    }
    return eventList;
}

function addEvent() {
    let eventList = JSON.parse(sessionStorage.getItem("eventArray")) || eventArray;

    let obj = {};
    obj["event"] = document.getElementById("eventName").value;
    obj["city"] = document.getElementById("eventCity").value;
    obj["state"] = document.getElementById("eventState").value;
    obj["attendance"] = document.getElementById("eventAttend").value;
    obj["date"] = document.getElementById("eventDate").value;

    eventList.push(obj);

    sessionStorage.setItem("eventArray", JSON.stringify(eventList));

    buildDropDown();
    displayData(eventList);
};


function displayData(eventList) {
    const template = document.getElementById("dataTemplate");
    const body = document.getElementById("tableBody");

    body.innerHTML = "";

    for (let i = 0; i < eventList.length; i++) {
        const tableRow = document.importNode(template.content, true);

        tableRow.getElementById("event").textContent = eventList[i].event;
        tableRow.getElementById("city").textContent = eventList[i].city;
        tableRow.getElementById("state").textContent = eventList[i].state;
        tableRow.getElementById("attendance").textContent = eventList[i].attendance;
        let dateString = formatDate(eventList[i].date)
        tableRow.getElementById("date").textContent = dateString;
        body.appendChild(tableRow);
    };
}


// Reformat new dates
function formatDate(dateString) {
    if (dateString.includes("-")) {
        let [year, month, day] = dateString.split('-');
        return [month, day, year].join('/');
    }
    return dateString;
}