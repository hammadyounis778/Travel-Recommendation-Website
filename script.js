document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search input");
    const searchButton = document.querySelector(".search button");
    const clearButton = document.querySelectorAll(".search button")[1];
    const resultsContainer = document.querySelector(".results");
    const timeContainer = document.createElement("div");
    timeContainer.className = "date-time";
    document.body.prepend(timeContainer);

    async function fetchTime(query) {
        const apiKey = "GISSD0DULQZ6";
        const timeApiUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${query}`;
        try {
            const response = await fetch(timeApiUrl);
            const data = await response.json();
            if (data.status === "OK") {
                timeContainer.textContent = `Current Time in ${query}: ${new Date(data.formatted).toLocaleString()}`;
            } else {
                timeContainer.textContent = "Time data unavailable";
            }
        } catch (error) {
            console.error("Error fetching time:", error);
            timeContainer.textContent = "Time data unavailable";
        }
    }

    function fetchDestinations(query) {
        const destinations = {
            beach: [
                { name: "Beach 1", image: "beach1.jpg", description: "Anse Source d'Argent is a beach situated in the southwest coast of La Digue, Seychelles. It is listed in Lonely Planet as one of the world's best beaches in 2024" },
                { name: "Beach 2", image: "beach2.jpg", description: "Navagio Beach, or Zakynthos Cove, or Smuggler's Bay, or Shipwreck Cove – many names exist for this small inlet on the island of Zakynthos" }
            ],
            temple: [
                { name: "Temple 1", image: "temple1.jpg", description: "Angkor Wat is a Hindu-Buddhist temple complex in Cambodia. Located on a site measuring 162.6 hectares within the ancient Khmer capital city of Angkor, it was originally constructed in 1150 CE as a Hindu temple dedicated to the deity Vishnu" },
                { name: "Temple 2", image: "temple2.avif", description: "The Borobudur temple complex located in central Java in Indonesia. It contains over 2500 and 500 Buddha statues" }
            ]
        };
        return destinations[query] || [];
    }

    async function displayResults() {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) return;

        resultsContainer.innerHTML = "<h2>Recommended Destinations:</h2>";
        await fetchTime(query);
        const destinations = fetchDestinations(query);

        if (destinations.length === 0) {
            resultsContainer.innerHTML += "<p>No results found.</p>";
            return;
        }

        destinations.forEach(destination => {
            const destinationDiv = document.createElement("div");
            destinationDiv.className = "destination";
            destinationDiv.innerHTML = `
                <h3>${destination.name}</h3>
                <img src="${destination.image}" alt="${destination.name}">
                <p>${destination.description}</p>
            `;
            resultsContainer.appendChild(destinationDiv);
        });
    }

    searchButton.addEventListener("click", displayResults);
    clearButton.addEventListener("click", () => {
        searchInput.value = "";
        resultsContainer.innerHTML = "";
        timeContainer.textContent = "";
    });
});

