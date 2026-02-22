document.addEventListener("DOMContentLoaded", () => {
  const storageKey = "myEvents";
  const eventData = JSON.parse(localStorage.getItem("selectedEvent"));

  if (eventData) {
    document.getElementById("eventTitle").innerText = eventData.title;
    document.getElementById("eventDescription").innerText = eventData.description;
    document.getElementById("eventDate").innerText = eventData.date;
    document.getElementById("eventTime").innerText = eventData.time;
    document.getElementById("eventLocation").innerText = eventData.location;
    document.getElementById("eventImage").src = eventData.image;
  }

  // Reminder toggle
  const reminderToggle = document.getElementById("reminder-toggle");
  reminderToggle.addEventListener("click", () => {
    alert("Reminder toggled! (Simulation – on/off for notifications).");
  });

  // Add to Calendar (simulation)
  window.addToCalendar = () => {
    alert("Added to Calendar! (Simulation – would sync to device calendar).");
  };

  // Go to My Events
  window.goToMyEvents = () => {
    window.location.href = "myevents.html";
  };

  // Share Event
  window.shareEvent = () => {
    alert("Share feature coming soon!");
  };

  // Update badge
  const badge = document.getElementById("eventCount");
  const savedEvents = JSON.parse(localStorage.getItem(storageKey)) || [];
  badge.innerText = savedEvents.length;
});