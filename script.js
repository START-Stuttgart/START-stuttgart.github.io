document.addEventListener("DOMContentLoaded", function () {
  fetch("events.csv")
    .then((response) => response.text())
    .then((data) => {
      const events = parseCSV(data)
      const eventsList = document.getElementById("events-list")
      events.forEach((event) => {
        const eventItem = document.createElement("li")
        eventItem.classList.add("event")

        const title = document.createElement("h2")
        title.textContent = event.title
        eventItem.appendChild(title)

        const date = document.createElement("p")
        date.textContent = `Date: ${event.date}`
        eventItem.appendChild(date)

        const location = document.createElement("p")
        location.textContent = `Location: ${event.location}`
        eventItem.appendChild(location)

        const link = document.createElement("a")
        link.href = event.link
        link.textContent = "More Info"
        link.target = "_blank"
        eventItem.appendChild(link)

        const image = document.createElement("img")
        image.src = event.picture
        image.alt = "Event Picture"
        eventItem.appendChild(image)

        eventsList.appendChild(eventItem)
      })
    })
    .catch((error) => console.error("Error fetching the CSV file:", error))
})

function parseCSV(data) {
  const lines = data.split("\n").filter((line) => line.trim() !== "")
  const headers = lines[0].split(",").map((header) => header.trim())
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((value) => value.trim())
    let event = {}
    headers.forEach((header, index) => {
      event[header] = values[index]
    })
    return event
  })
}
