document.addEventListener("DOMContentLoaded", () => {
  // Load the selected event from localStorage
  const eventData = JSON.parse(localStorage.getItem("selectedEvent"));

  if (eventData) {
    document.getElementById("eventTitle").innerText = eventData.title;
    document.getElementById("eventDescription").innerText = eventData.description;
    document.getElementById("eventDate").innerText = eventData.date;
    document.getElementById("eventTime").innerText = eventData.time;
    document.getElementById("eventLocation").innerText = eventData.location;
    document.getElementById("eventImage").src = eventData.image;
  } else {
    document.getElementById("eventTitle").innerText = "No event selected";
  }

  // Add to Google Calendar – opens pre-filled event in user's Google Calendar
  window.addToCalendar = () => {
    if (!eventData) {
      alert("No event data available.");
      return;
    }

    // Format date/time for Google Calendar URL
    // Google expects YYYYMMDDT HHMMSSZ (UTC) or YYYYMMDDTHHMMSS (local)
    // For simplicity, we use local time format (no timezone conversion here)
    const startDateTime = `${eventData.date.replace(/-/g, '')}T${eventData.time.replace(':', '')}00`;
    const endDateTime = `${eventData.date.replace(/-/g, '')}T${eventData.time.replace(':', '')}00`; // same day, same time (duration not specified)

    const title = encodeURIComponent(eventData.title);
    const details = encodeURIComponent(eventData.description);
    const location = encodeURIComponent(eventData.location);

    const googleCalendarUrl = 
      `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${title}` +
      `&details=${details}` +
      `&location=${location}` +
      `&dates=${startDateTime}/${endDateTime}`;

    // Open in new tab
    window.open(googleCalendarUrl, '_blank');

    alert("Opening Google Calendar – event pre-filled. You can set a reminder there.");
  };

  // View My Events
  window.goToMyEvents = () => {
    window.location.href = "myevents.html";
  };

  // Update badge (My Events count)
  const badge = document.getElementById("eventCount");
  if (badge) {
    const myEvents = JSON.parse(localStorage.getItem("myEvents")) || [];
    badge.innerText = myEvents.length;
  }
});

