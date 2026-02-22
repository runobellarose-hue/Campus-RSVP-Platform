document.addEventListener("DOMContentLoaded", () => {
  const storageKey = "myEvents";
  const list = document.getElementById("eventsList");
  const emptyState = document.getElementById("emptyState");
  const badge = document.getElementById("eventCount");

  function loadEvents() {
    const savedEvents = JSON.parse(localStorage.getItem(storageKey)) || [];

    badge.innerText = savedEvents.length;

    if (savedEvents.length === 0) {
      emptyState.style.display = "block";
      list.innerHTML = "";
      return;
    }

    emptyState.style.display = "none";

    list.innerHTML = savedEvents.map(event => `
      <div class="event-card" data-event-id="${event.id}">
        <img src="${event.image}" alt="${event.title}" />
        <div class="event-content">
          <h3>${event.title}</h3>
          <p>${event.description}</p>
          <div class="meta">
            <span><i class="fa fa-calendar"></i> ${event.date}</span>
            <span><i class="fa fa-clock"></i> ${event.time}</span>
            <span><i class="fa fa-location-dot"></i> ${event.location}</span>
          </div>
          <button class="btn-remove" onclick="removeEvent('${event.id}')">Remove</button>
        </div>
      </div>
    `).join('');
  }

  // Remove function
  window.removeEvent = (eventId) => {
    let savedEvents = JSON.parse(localStorage.getItem(storageKey)) || [];
    savedEvents = savedEvents.filter(e => e.id !== eventId);
    localStorage.setItem(storageKey, JSON.stringify(savedEvents));
    loadEvents(); // Refresh immediately
  };

  // Initial load
  loadEvents();
});