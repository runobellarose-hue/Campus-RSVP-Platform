document.addEventListener("DOMContentLoaded", () => {
  // PRE-LOADED EVENTS (6 samples – always show)
  const preEvents = [
    {
      id: "pre-001",
      title: "Tech Innovation Summit",
      description: "Explore the future of AI and robotics",
      date: "2026-02-25",
      time: "10:00 AM",
      location: "Lecture Theatre 1",
      category: "academic",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644"
    },
    {
      id: "pre-002",
      title: "Campus Social Mixer",
      description: "Meet new friends and network",
      date: "2026-03-05",
      time: "6:00 PM",
      location: "Student Union Hall",
      category: "social",
      image: "https://images.unsplash.com/photo-1515169067868-5387ec356754"
    },
    {
      id: "pre-003",
      title: "Inter-Faculty Basketball Finals",
      description: "Championship match – don't miss it!",
      date: "2026-03-15",
      time: "4:00 PM",
      location: "Sports Arena",
      category: "sports",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b"
    },
    {
      id: "pre-004",
      title: "Photography Masterclass",
      description: "Learn creative techniques from pros",
      date: "2026-03-22",
      time: "11:00 AM",
      location: "Media Lab",
      category: "club",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
    },
    {
      id: "pre-005",
      title: "Guest Lecture: Entrepreneurship",
      description: "Insights from successful founders",
      date: "2026-04-02",
      time: "2:00 PM",
      location: "Auditorium",
      category: "academic",
      image: "https://images.unsplash.com/photo-1519167758481-83f228a222b1"
    },
    {
      id: "pre-006",
      title: "Outdoor Movie Night",
      description: "Free screening under the stars",
      date: "2026-04-10",
      time: "7:30 PM",
      location: "Campus Quad",
      category: "social",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205"
    }
  ];

  db.collection("events").get().then(snapshot => {
  let events = [];
  snapshot.forEach(doc => {
    events.push({ id: doc.id, ...doc.data() });
  });
  renderEvents(events); // your render function
});

  // Merge: pre + user (no duplicates)
  const allEvents = [
    ...preEvents,
    ...userEvents.filter(ue => !preEvents.some(pe => pe.id === ue.id))
  ];

  // DOM Elements
  const upcomingList = document.getElementById('upcoming-list');
  const noResults = document.getElementById('no-results');
  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Render Upcoming Events
  function renderUpcoming(filteredEvents) {
    upcomingList.innerHTML = "";

    if (filteredEvents.length === 0) {
      upcomingList.innerHTML = '<p style="text-align:center; color:#888;">No events found.</p>';
      return;
    }

    filteredEvents.forEach(event => {
      upcomingList.innerHTML += `
        <div class="event-card" data-category="${event.category}">
          <img src="${event.image}" alt="${event.title}" />
          <div class="event-content">
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <div class="meta">
              <span><i class="fa fa-calendar"></i> ${event.date}</span>
              <span><i class="fa fa-clock"></i> ${event.time}</span>
              <span><i class="fa fa-location-dot"></i> ${event.location}</span>
            </div>
            <div class="card-bottom">
              <small>${event.category.charAt(0).toUpperCase() + event.category.slice(1)}</small>
              <button class="rsvp-btn" data-event-id="${event.id}">RSVP</button>
            </div>
          </div>
        </div>
      `;
    });

    // Re-attach RSVP listeners
    document.querySelectorAll(".rsvp-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".event-card");
        const eventId = btn.dataset.eventId;

        const eventData = {
          id: eventId,
          title: card.querySelector("h3").innerText,
          description: card.querySelector("p").innerText,
          date: card.querySelector(".meta span:nth-child(1)").textContent.trim(),
          time: card.querySelector(".meta span:nth-child(2)").textContent.trim(),
          location: card.querySelector(".meta span:nth-child(3)").textContent.trim(),
          image: card.querySelector("img").src
        };

        let savedEvents = JSON.parse(localStorage.getItem("myEvents")) || [];

        const exists = savedEvents.some(e => e.id === eventId);
        if (!exists) {
          savedEvents.push(eventData);
          localStorage.setItem("myEvents", JSON.stringify(savedEvents));
          btn.textContent = "Going";
          btn.classList.add("rsvpd");
          localStorage.setItem("selectedEvent", JSON.stringify(eventData));
          window.location.href = "confirmation.html";
        }
      });
    });
  }

  // Initial render: show all events
  renderUpcoming(allEvents);

  // ──────────────────────────────────────────────
  // INTERACTIVE CALENDAR
  // ──────────────────────────────────────────────
  const monthSelect = document.getElementById('month-select');
  const yearSelect = document.getElementById('year-select');
  const prevBtn = document.getElementById('prev-month');
  const nextBtn = document.getElementById('next-month');
  const grid = document.getElementById('calendar-grid');

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  function generateCalendar(month, year) {
    grid.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('div');
      empty.classList.add('calendar-day', 'empty');
      grid.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEl = document.createElement('div');
      dayEl.classList.add('calendar-day');
      dayEl.textContent = day;

      const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      if (allEvents.some(e => e.date === dayStr)) {
        dayEl.classList.add('has-event');
      }

      dayEl.addEventListener('click', () => {
        const filtered = allEvents.filter(e => e.date === dayStr);
        renderUpcoming(filtered);

        if (filtered.length === 0) {
          alert("No events on this day.");
        }
      });

      grid.appendChild(dayEl);
    }
  }

  function updateCalendar() {
    monthSelect.value = currentMonth;
    yearSelect.value = currentYear;
    generateCalendar(currentMonth, currentYear);
  }

  prevBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    updateCalendar();
  });

  nextBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    updateCalendar();
  });

  monthSelect.addEventListener('change', () => {
    currentMonth = parseInt(monthSelect.value);
    updateCalendar();
  });

  yearSelect.addEventListener('change', () => {
    currentYear = parseInt(yearSelect.value);
    updateCalendar();
  });

  // Initial calendar load
  updateCalendar();

  // ──────────────────────────────────────────────
  // CATEGORY FILTER BUTTONS
  // ──────────────────────────────────────────────
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      document.querySelector(".active-filter").classList.remove("active-filter");
      button.classList.add("active-filter");

      const category = button.dataset.category;
      const filtered = (category === "all") ? allEvents : allEvents.filter(e => e.category === category);
      renderUpcoming(filtered);
    });
  });

  // ──────────────────────────────────────────────
  // SEARCH BAR
  // ──────────────────────────────────────────────
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase().trim();
      const filtered = allEvents.filter(e => 
        e.title.toLowerCase().includes(searchTerm) || e.description.toLowerCase().includes(searchTerm)
      );
      renderUpcoming(filtered);

      if (noResults) {
        noResults.style.display = filtered.length === 0 ? "block" : "none";
      }
    });
  }

});
