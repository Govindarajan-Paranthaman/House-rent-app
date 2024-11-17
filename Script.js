const properties = [
    {
        id: 1,
        title: "Modern Apartment in Downtown",
        type: "apartment",
        rent: 2000,
        location: "City Center",
        image: "https://lalafilmltd.wordpress.com/wp-content/uploads/2015/06/bruce-wayne-home.jpg?w=700&h=297",
    },
    {
        id: 2,
        title: "Spacious Family House",
        type: "house",
        rent: 3500,
        location: "Suburbs",
        image: "https://na.rdcpix.com/625946635/a545dc497c1d4e1385851ca5e12f5a14w-c0rd-w832_h468_r4_q80.jpg"
    },
    {
        id: 3,
        title: "Cozy Room Near University",
        type: "room",
        rent: 800,
        location: "College Area",
        image: "https://media.tenor.com/hS2FxX4_BMIAAAAe/tobey-maguire-spiderman.png"
    },
];

const propertyList = document.getElementById("property-list");
const searchBar = document.getElementById("search-bar");
const rentRange = document.getElementById("rent-range");
const rentValue = document.getElementById("rent-value");
const propertyType = document.getElementById("property-type");
const filterBtn = document.getElementById("filter-btn");

rentRange.addEventListener("input", () => {
    rentValue.textContent = `$${rentRange.value}`;
});

const renderProperties = (data) => {
    propertyList.innerHTML = "";
    if (data.length === 0) {
        propertyList.innerHTML = "<p>No properties match your criteria.</p>";
        return;
    }
    data.forEach((property) => {
        const card = document.createElement("div");
        card.className = "property-card";
        card.innerHTML = `
            <img src="${property.image}" alt="${property.title}" />
            <div class="details">
                <h3>${property.title}</h3>
                <p>${property.location}</p>
                <p>Rent: $${property.rent}</p>
                <p>Type: ${property.type}</p>
                <button>Contact</button>
            </div>
        `;
        propertyList.appendChild(card);
    });
};

filterBtn.addEventListener("click", () => {
    const searchText = searchBar.value.toLowerCase();
    const maxRent = parseInt(rentRange.value, 10);
    const selectedType = propertyType.value;

    const filteredProperties = properties.filter((property) => {
        const matchesSearch = property.title.toLowerCase().includes(searchText) || 
                              property.location.toLowerCase().includes(searchText);
        const matchesRent = property.rent <= maxRent;
        const matchesType = selectedType === "all" || property.type === selectedType;

        return matchesSearch && matchesRent && matchesType;
    });

    renderProperties(filteredProperties);
});

// Initial rendering
renderProperties(properties);
