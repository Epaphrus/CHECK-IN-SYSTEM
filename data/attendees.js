// This simulates the data from your Excel sheet
const attendees = [
    { name: "Maxwel Khadambi", email: "maxwel@gmail.com", title: "CEO, Tech Corp", checkedIn: false },
    { name: "Michael Kiptoo", email: "michael@gmail.com", title: "CTO, Innovate Inc", checkedIn: false },
    // Add more attendees as needed
];

// Load any previously checked-in status from local storage
const storedAttendees = localStorage.getItem('attendees');
if (storedAttendees) {
    const parsedAttendees = JSON.parse(storedAttendees);
    attendees.forEach((attendee, index) => {
        if (parsedAttendees[index] && parsedAttendees[index].checkedIn) {
            attendee.checkedIn = true;
        }
    });
}