document.getElementById("add-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const eventData = {
    id: Date.now().toString(),  // unique ID
    title: document.getElementById("title").value.trim(),
    description: document.getElementById("description").value.trim(),
    date: document.getElementById("date").value,  // should be YYYY-MM-DD
    time: document.getElementById("time").value,
    location: document.getElementById("location").value.trim(),
    category: document.getElementById("category").value.trim().toLowerCase(),
    image: document.getElementById("image").value.trim() || "https://via.placeholder.com/300x160?text=Event+Image"
  };

  let events = JSON.parse(localStorage.getItem("events")) || [];
  events.push(eventData);
  localStorage.setItem("events", JSON.stringify(events));

  alert("Event added successfully! It will now appear in Home and Discover.");
  window.location.href = "home.html"; // or "discover.html"
});