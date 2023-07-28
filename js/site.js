const events = [
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];

function getEvents() {
    return events;
}

function buildDropDown() {

    //get the current events
    let currentEvents = getEvents();

    //get list of unique cities
    let eventCities = currentEvents.map(event => event.city);
    let distinctCities = new Set(eventCities);
    let dropdownChoices = ['All', ...distinctCities];

    const dropdownDiv = document.getElementById('city-dropdown');
    const dropdownItemTemplate = document.getElementById('drowdown-template');

    //copy dropdown template for each unique city and change text, put it in the dropdown

    dropdownChoices.forEach(choice => {

        let dropdownItemCopy = dropdownItemTemplate.content.cloneNode(true);
        let aTag = dropdownItemCopy.querySelector('a');
        aTag.innerText = choice;

        dropdownDiv.appendChild(dropdownItemCopy);
    });

    displayEvents(currentEvents);
    displayStats(events);
}

function displayEvents(events) {

    //find table on the page
    const eventsTable = document.getElementById('events-table');

    // find template & clone template
    const eventTemplate = document.getElementById('table-row-template');

    //clear out the table
    eventsTable.innerHTML = '';

    //get each property of an event 7 insert into cloned template
    for (let index = 0; index < events.length; index = index + 1) {
        let event = events[index];

        let tableRow = eventTemplate.content.cloneNode(true);

        let eventNameCell = tableRow.querySelector('[data-id="event"]');
        eventNameCell.innerText = event.event;


        tableRow.querySelector('[data-id="city"]').innerText = event.city;
        tableRow.querySelector('[data-id="state"]').innerText = event.state;
        tableRow.querySelector('[data-id="attendance"]').innerText = event.attendance;
        tableRow.querySelector('[data-id="date"]').innerText = event.date;


        //insert event data on table

        eventsTable.appendChild(tableRow);
    }



}

function displayStats(events) {

    let total = 0;
    let max = 0;
    let min = events[0].attendance;


    for (let index = 0; index < events.length; index = index + 1) {
        let event = events[index];

        total = total + event.attendance;

        if (event.attendance > max) {
            max = event.attendance;
        }

        if (event.attendance < min) {
            min = event.attendance;
        }

    }

    let average = total / events.length;

    document.getElementById('total-attendance').innerHTML = total.toLocaleString();
    document.getElementById('avg-attendance').innerHTML = Math.round(average).toLocaleString();
    document.getElementById('max-attended').innerHTML = max.toLocaleString();
    document.getElementById('min-attended').innerHTML = min.toLocaleString();
}