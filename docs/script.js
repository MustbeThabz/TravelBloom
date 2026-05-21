// Travel Recommendations Database
const travelData = {
    beaches: [
        {
            name: "Bora Bora, French Polynesia",
            image: "https://images.unsplash.com/photo-1519044970425-9711a70ef3a9?w=400",
            description: "Crystal clear waters and overwater bungalows make this paradise unforgettable."
        },
        {
            name: "Whitehaven Beach, Australia",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
            description: "Pure white silica sand stretching for 7 kilometers along Whitsunday Island."
        }
    ],
    temples: [
        {
            name: "Angkor Wat, Cambodia",
            image: "https://images.unsplash.com/photo-1532546880471-1e1d4f65a707?w=400",
            description: "The largest religious monument in the world, a masterpiece of Khmer architecture."
        },
        {
            name: "Borobudur, Indonesia",
            image: "https://images.unsplash.com/photo-1557412253-24c7c79d8579?w=400",
            description: "A 9th-century Mahayana Buddhist temple with stunning stone reliefs."
        }
    ],
    countries: [
        {
            name: "Japan",
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400",
            description: "Experience the perfect blend of ancient traditions and futuristic cities."
        },
        {
            name: "Italy",
            image: "https://images.unsplash.com/photo-1498349638872-ee9ce6bcf710?w=400",
            description: "Rich history, incredible cuisine, and stunning architecture await you."
        }
    ]
};

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const recommendationsDiv = document.getElementById('recommendations');

function isHomePagePath() {
    const path = window.location.pathname || '';
    return path.endsWith('/') || path.endsWith('/index.html') || path === '/' || path === '';
}

// Search Function
function performSearch() {
    if (!searchInput) return;

    // Recommendations panel exists only on the home page. If the user searches
    // from another page, redirect to home and restore the query there.
    if (!recommendationsDiv) {
        const query = searchInput.value.trim();
        if (query) {
            sessionStorage.setItem('travelSearch', query);
        }
        window.location.href = 'index.html';
        return;
    }

    const keyword = searchInput.value.toLowerCase().trim();

    if (!keyword) {
        recommendationsDiv.classList.remove('show');
        recommendationsDiv.innerHTML = '';
        return;
    }

    let results = [];

    // Check for beach-related keywords
    if (keyword.includes('beach') || keyword.includes('beaches') || keyword.includes('sea') || keyword.includes('coast')) {
        results = [...travelData.beaches];
    }
    // Check for temple-related keywords
    else if (keyword.includes('temple') || keyword.includes('temples') || keyword.includes('angkor') || keyword.includes('borobudur')) {
        results = [...travelData.temples];
    }
    // Check for country-related keywords
    else if (keyword.includes('country') || keyword.includes('countries') || keyword.includes('japan') || keyword.includes('italy') || keyword.includes('destination')) {
        results = [...travelData.countries];
    }
    // Check specific country names
    else if (keyword === 'japan') {
        results = [travelData.countries[0]];
    }
    else if (keyword === 'italy') {
        results = [travelData.countries[1]];
    }
    // Check specific beach names
    else if (keyword.includes('bora') || keyword.includes('bora bora')) {
        results = [travelData.beaches[0]];
    }
    else if (keyword.includes('whitehaven')) {
        results = [travelData.beaches[1]];
    }
    // Check specific temple names
    else if (keyword.includes('angkor')) {
        results = [travelData.temples[0]];
    }
    else if (keyword.includes('borobudur')) {
        results = [travelData.temples[1]];
    }

    displayResults(results);
}

// Display Results
function displayResults(results) {
    if (!recommendationsDiv) return;

    if (results.length === 0) {
        recommendationsDiv.innerHTML = '<p style="color: #666;">No recommendations found. Try searching for "beach", "temple", or "country".</p>';
        recommendationsDiv.classList.add('show');
        return;
    }

    recommendationsDiv.innerHTML = results.map(item => `
        <div class="recommendation-card">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <button class="book-btn" style="margin-top: 10px; padding: 8px 20px; font-size: 0.9rem;">Book Now</button>
        </div>
    `).join('');

    recommendationsDiv.classList.add('show');

    // Add event listeners to new book buttons
    document.querySelectorAll('.recommendation-card .book-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Thank you for your interest! Our travel specialists will contact you soon.');
        });
    });
}

// Clear Search
function clearSearch() {
    if (searchInput) {
        searchInput.value = '';
    }
    if (recommendationsDiv) {
        recommendationsDiv.classList.remove('show');
        recommendationsDiv.innerHTML = '';
    }
}

// Book Now Button Handler
function handleBookNow() {
    alert('Welcome to TravelBloom! Please contact us to start planning your dream vacation.');
}

// Contact Form Handler (for contact.html)
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const formMessage = document.getElementById('formMessage');
            if (formMessage) {
                formMessage.innerHTML = `Thank you ${name}! We've received your message and will respond to ${email} within 24 hours.`;
                formMessage.style.color = '#4caf50';
                contactForm.reset();

                setTimeout(() => {
                    formMessage.innerHTML = '';
                }, 5000);
            }
        });
    }
}

// Event Listeners
if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
}
if (clearBtn) {
    clearBtn.addEventListener('click', clearSearch);
}
if (searchInput) {
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Book Now button on home page
const bookBtn = document.querySelector('.hero .book-btn');
if (bookBtn) {
    bookBtn.addEventListener('click', handleBookNow);
}

// Initialize contact form
initContactForm();

// Handle navigation between pages - preserve search on index page
if (isHomePagePath()) {
    // Check if coming from another page with search query
    const savedSearch = sessionStorage.getItem('travelSearch');
    if (savedSearch && searchInput) {
        searchInput.value = savedSearch;
        performSearch();
        sessionStorage.removeItem('travelSearch');
    }
}

// Save search query before leaving index page
if (searchInput) {
    window.addEventListener('beforeunload', () => {
        if (isHomePagePath()) {
            sessionStorage.setItem('travelSearch', searchInput.value);
        }
    });
}

console.log('TravelBloom website loaded successfully!');
