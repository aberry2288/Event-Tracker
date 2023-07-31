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

    let storedString = localStorage.getItem('asb-events') || '[]';
    
    let storedEvents = JSON.parse(storedString);

    if (storedEvents.length == 0) {
        storedEvents = events;
        localStorage.setItem('asb-events' , JSON.stringify(events));
    }

    return storedEvents;
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

    dropdownDiv.innerHTML = '',

    //copy dropdown template for each unique city and change text, put it in the dropdown

    dropdownChoices.forEach(choice => {

        let dropdownItemCopy = dropdownItemTemplate.content.cloneNode(true);
        let aTag = dropdownItemCopy.querySelector('a');
        aTag.innerText = choice;

        dropdownDiv.appendChild(dropdownItemCopy);
    });

    document.getElementById('stats-location').textContent = 'All';
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
        tableRow.querySelector('[data-id="attendance"]').innerText = event.attendance.toLocaleString();
        tableRow.querySelector('[data-id="date"]').innerText = new Date(event.date).toLocaleDateString();


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

function filterEvents(dropdownItemClicked) {

    let cityName = dropdownItemClicked.innerText;

    document.getElementById('stats-location').textContent = cityName;

    let allEvents = getEvents();

    let filteredEvents = [];

    if (cityName == 'All') {

        filteredEvents = allEvents;

    } else {

        for (let i = 0; i < allEvents.length; i = i + 1) {

            let event = allEvents[i];

            if (event.city == cityName) {
                filteredEvents.push(event);
            }
        }

        // This is another way to write the for loop that works just as good, just put this after else {
        // filteredEvents = allEvents.filter(event => event.city == cityName); 
    }

    displayStats(filteredEvents);
    displayEvents(filteredEvents);

}

function saveEvent() {

    let eventName = document.getElementById('newEventName').value;

    let city = document.getElementById('newEventCity').value;

    let stateSelect = document.getElementById('newEventState');
    let selectedIndex = stateSelect.selectedIndex;
    let selectedOption = stateSelect.options[selectedIndex];
    let state = selectedOption.text;

    let attendance = parseInt(document.getElementById('newEventAttendance').value);
    
    let dateString = document.getElementById('newEventDate').value;
    dateString = `${dateString} 00:00`;
    let eventDate = new Date(dateString).toLocaleDateString();

    let newEvent = {

        event: eventName,
        city: city,
        state: state,
        attendance: attendance,
        date: eventDate,

    };

    let allEvents = getEvents();

    allEvents.push(newEvent);

    localStorage.setItem('asb-events' , JSON.stringify(allEvents));

    document.getElementById('newEventForm').reset();

    buildDropDown();

    let modal = bootstrap.Modal.getInstance(document.getElementById('newEventModal'));
    modal.hide();
}







