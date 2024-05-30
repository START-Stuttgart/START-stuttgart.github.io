document.addEventListener("DOMContentLoaded", function () {
  fetch("events.csv")
    .then((response) => response.text())
    .then((data) => {
      const events = parseCSV(data)
      console.log(events)
      const eventsList = document.getElementById("events-list")
      events.forEach((event) => {
        const eventItem = document.createElement("li")
        eventItem.classList.add("event")

        // Title
        const title = document.createElement("h2")
        title.textContent = event.title
        eventItem.appendChild(title)

        // Date
        const date = document.createElement("p")
        date.textContent = `Date: ${event.date}`
        eventItem.appendChild(date)

        // Location
        const location = document.createElement("p")
        location.textContent = `Location: ${event.location}`
        eventItem.appendChild(location)

        // Link
        const link = document.createElement("a")
        link.href = event.link
        link.textContent = "More Info"
        link.target = "_blank"
        eventItem.appendChild(link)

        // Image
        const image = document.createElement("img")
        if (event.picture) {
          image.src = event.picture
          image.alt = "Event Picture"
        } else {
          image.alt = "No picture available"
          image.style.display = "none" // Hide the image element if no picture is available
        }
        eventItem.appendChild(image)

        eventsList.appendChild(eventItem)
      })
    })
    .catch((error) => console.error("Error fetching the CSV file:", error))
})

function parseCSV(data) {
  const parsed = Papa.parse(data, {
    header: true,
    skipEmptyLines: true,
  })
  return parsed.data
}
