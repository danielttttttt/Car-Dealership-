// Luxury Motors - Main JavaScript File

// Global Variables
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentLanguage = localStorage.getItem('language') || 'en';
let chatOpen = false;

// Car Database
const carDatabase = [
    {
        id: 1,
        name: "Bugatti Chiron",
        brand: "Bugatti",
        price: 3200000,
        year: 2024,
        hp: 1479,
        topSpeed: 261,
        image: "assets/images/chiron.jpg",
        images: ["assets/images/chiron.jpg", "assets/images/BACKBUG.jpg"],
        specs: {
            engine: "8.0L W16 Quad-Turbo",
            transmission: "7-Speed DSG",
            acceleration: "2.4 seconds 0-60mph",
            weight: "4,400 lbs"
        },
        features: ["Carbon Fiber Body", "Active Aerodynamics", "Michelin Pilot Sport Cup 2", "Luxury Interior"]
    },
    {
        id: 2,
        name: "McLaren 720S",
        brand: "McLaren",
        price: 315000,
        year: 2024,
        hp: 710,
        topSpeed: 212,
        image: "assets/images/mclaren.jpg",
        images: ["assets/images/mclaren.jpg", "assets/images/mc720.jpg"],
        specs: {
            engine: "4.0L V8 Twin-Turbo",
            transmission: "7-Speed SSG",
            acceleration: "2.9 seconds 0-60mph",
            weight: "3,186 lbs"
        },
        features: ["Dihedral Doors", "Carbon Fiber Monocoque", "Adaptive Suspension", "Track Mode"]
    },
    {
        id: 3,
        name: "Lamborghini Huracán",
        brand: "Lamborghini",
        price: 248000,
        year: 2024,
        hp: 630,
        topSpeed: 202,
        image: "assets/images/hurican.jpg",
        images: ["assets/images/hurican.jpg"],
        specs: {
            engine: "5.2L V10 Naturally Aspirated",
            transmission: "7-Speed DCT",
            acceleration: "3.2 seconds 0-60mph",
            weight: "3,135 lbs"
        },
        features: ["All-Wheel Drive", "Dynamic Steering", "Magnetic Ride", "Launch Control"]
    },
    {
        id: 4,
        name: "Rolls-Royce Phantom",
        brand: "Rolls-Royce",
        price: 460000,
        year: 2024,
        hp: 563,
        topSpeed: 155,
        image: "assets/images/rolls1.jpg",
        images: ["assets/images/rolls1.jpg", "assets/images/rols2.jpg", "assets/images/rols3.jpg"],
        specs: {
            engine: "6.75L V12 Twin-Turbo",
            transmission: "8-Speed Automatic",
            acceleration: "5.3 seconds 0-60mph",
            weight: "5,644 lbs"
        },
        features: ["Magic Carpet Ride", "Starlight Headliner", "Bespoke Interior", "Whisper Quiet"]
    },
    {
        id: 5,
        name: "Koenigsegg Jesko",
        brand: "Koenigsegg",
        price: 3000000,
        year: 2024,
        hp: 1600,
        topSpeed: 330,
        image: "assets/images/jesko.jpg",
        images: ["assets/images/jesko.jpg", "assets/images/rev.jpg"],
        specs: {
            engine: "5.0L V8 Twin-Turbo",
            transmission: "9-Speed LST",
            acceleration: "2.5 seconds 0-60mph",
            weight: "3,131 lbs"
        },
        features: ["Active Aerodynamics", "Carbon Fiber Construction", "Track Mode", "Lightweight Design"]
    },
    {
        id: 6,
        name: "Lamborghini Sián",
        brand: "Lamborghini",
        price: 3600000,
        year: 2024,
        hp: 819,
        topSpeed: 217,
        image: "assets/images/sian.jpg",
        images: ["assets/images/sian.jpg"],
        specs: {
            engine: "6.5L V12 + Electric Motor",
            transmission: "7-Speed ISR",
            acceleration: "2.8 seconds 0-60mph",
            weight: "3,516 lbs"
        },
        features: ["Hybrid Technology", "Supercapacitor", "Active Aerodynamics", "Limited Edition"]
    }
];

// Language Translations
const translations = {
    en: {
        home: "Home",
        inventory: "Inventory",
        about: "About",
        contact: "Contact",
        experienceLuxury: "Experience Luxury",
        discoverCars: "Discover the world's most exclusive supercars",
        viewCollection: "View Collection",
        featuredCollection: "Featured Collection",
        addToFavorites: "Add to Favorites",
        removeFromFavorites: "Remove from Favorites",
        compareNow: "Compare Now",
        bookTestDrive: "Book Test Drive",
        getFinancing: "Get Financing"
    },
    es: {
        home: "Inicio",
        inventory: "Inventario",
        about: "Acerca de",
        contact: "Contacto",
        experienceLuxury: "Experimenta el Lujo",
        discoverCars: "Descubre los supercoches más exclusivos del mundo",
        viewCollection: "Ver Colección",
        featuredCollection: "Colección Destacada",
        addToFavorites: "Añadir a Favoritos",
        removeFromFavorites: "Quitar de Favoritos",
        compareNow: "Comparar Ahora",
        bookTestDrive: "Reservar Prueba",
        getFinancing: "Obtener Financiación"
    },
    fr: {
        home: "Accueil",
        inventory: "Inventaire",
        about: "À propos",
        contact: "Contact",
        experienceLuxury: "Découvrez le Luxe",
        discoverCars: "Découvrez les supercars les plus exclusives au monde",
        viewCollection: "Voir la Collection",
        featuredCollection: "Collection Vedette",
        addToFavorites: "Ajouter aux Favoris",
        removeFromFavorites: "Retirer des Favoris",
        compareNow: "Comparer Maintenant",
        bookTestDrive: "Réserver un Essai",
        getFinancing: "Obtenir un Financement"
    }
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupEventListeners();
    loadFavorites();
    setupLanguage();
    createChatWidget();
    setupParallaxEffects();
    setupLoadingAnimations();
    setupSearchAndFilter();
});

// Initialize Website
function initializeWebsite() {
    console.log('Luxury Motors Website Initialized');
    updateFavoritesCount();
    setupSmoothScrolling();
    setupMobileMenu();
}

// Setup Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Setup car card interactions
    setupCarCardInteractions();
    
    // Setup form submissions
    setupFormSubmissions();
}

// Setup Car Card Interactions
function setupCarCardInteractions() {
    document.querySelectorAll('.car-card').forEach(card => {
        const carId = card.dataset.carId;
        
        // Add favorite button
        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = 'favorite-btn';
        favoriteBtn.innerHTML = favorites.includes(parseInt(carId)) ? '❤️' : '🤍';
        favoriteBtn.onclick = (e) => {
            e.stopPropagation();
            toggleFavorite(parseInt(carId));
        };
        
        // Add compare button
        const compareBtn = document.createElement('button');
        compareBtn.className = 'compare-btn';
        compareBtn.innerHTML = '⚖️';
        compareBtn.onclick = (e) => {
            e.stopPropagation();
            addToComparison(parseInt(carId));
        };
        
        // Add buttons container
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'card-buttons';
        buttonsContainer.appendChild(favoriteBtn);
        buttonsContainer.appendChild(compareBtn);
        
        card.appendChild(buttonsContainer);
        
        // Add click event for car details
        card.addEventListener('click', () => {
            showCarDetails(parseInt(carId));
        });
    });
}

// Toggle Favorite
function toggleFavorite(carId) {
    const index = favorites.indexOf(carId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(carId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesDisplay();
    updateFavoritesCount();
    showNotification(index > -1 ? 'Removed from favorites' : 'Added to favorites');
}

// Load Favorites
function loadFavorites() {
    updateFavoritesDisplay();
}

// Update Favorites Display
function updateFavoritesDisplay() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const card = btn.closest('.car-card');
        const carId = parseInt(card.dataset.carId);
        btn.innerHTML = favorites.includes(carId) ? '❤️' : '🤍';
    });
}

// Update Favorites Count
function updateFavoritesCount() {
    const countElement = document.querySelector('.favorites-count');
    if (countElement) {
        countElement.textContent = favorites.length;
    }
}

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Setup Mobile Menu
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// Setup Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Car Comparison System
let comparisonList = JSON.parse(localStorage.getItem('comparison')) || [];

function addToComparison(carId) {
    if (comparisonList.length >= 3) {
        showNotification('Maximum 3 cars can be compared', 'warning');
        return;
    }

    if (!comparisonList.includes(carId)) {
        comparisonList.push(carId);
        localStorage.setItem('comparison', JSON.stringify(comparisonList));
        updateComparisonCount();
        showNotification('Added to comparison');
    } else {
        showNotification('Car already in comparison', 'warning');
    }
}

function removeFromComparison(carId) {
    comparisonList = comparisonList.filter(id => id !== carId);
    localStorage.setItem('comparison', JSON.stringify(comparisonList));
    updateComparisonCount();
    showNotification('Removed from comparison');
}

function updateComparisonCount() {
    const countElement = document.querySelector('.comparison-count');
    if (countElement) {
        countElement.textContent = comparisonList.length;
    }
}

function showComparison() {
    if (comparisonList.length < 2) {
        showNotification('Select at least 2 cars to compare', 'warning');
        return;
    }
    window.location.href = 'comparison.html';
}

// Car Details Modal
function showCarDetails(carId) {
    const car = carDatabase.find(c => c.id === carId);
    if (!car) return;

    const modal = createCarDetailsModal(car);
    document.body.appendChild(modal);

    setTimeout(() => {
        modal.classList.add('show');
    }, 100);
}

function createCarDetailsModal(car) {
    const modal = document.createElement('div');
    modal.className = 'car-details-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="car-details-content">
                <div class="car-images">
                    <div class="main-image">
                        <img src="${car.image}" alt="${car.name}" id="main-car-image">
                    </div>
                    <div class="thumbnail-images">
                        ${car.images.map(img => `<img src="${img}" alt="${car.name}" class="thumbnail" onclick="changeMainImage('${img}')">`).join('')}
                    </div>
                </div>
                <div class="car-info-detailed">
                    <h2>${car.name}</h2>
                    <p class="car-price">$${car.price.toLocaleString()}</p>
                    <div class="car-specs">
                        <h3>Specifications</h3>
                        <div class="specs-grid">
                            <div class="spec-item">
                                <span class="spec-label">Engine:</span>
                                <span class="spec-value">${car.specs.engine}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Horsepower:</span>
                                <span class="spec-value">${car.hp} HP</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Top Speed:</span>
                                <span class="spec-value">${car.topSpeed} mph</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Transmission:</span>
                                <span class="spec-value">${car.specs.transmission}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">0-60 mph:</span>
                                <span class="spec-value">${car.specs.acceleration}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Weight:</span>
                                <span class="spec-value">${car.specs.weight}</span>
                            </div>
                        </div>
                    </div>
                    <div class="car-features">
                        <h3>Features</h3>
                        <ul>
                            ${car.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="car-actions">
                        <button class="btn-primary" onclick="bookTestDrive(${car.id})">Book Test Drive</button>
                        <button class="btn-secondary" onclick="getFinancing(${car.id})">Get Financing</button>
                        <button class="btn-outline" onclick="toggleFavorite(${car.id})">
                            ${favorites.includes(car.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Close modal event
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    });

    return modal;
}

function changeMainImage(imageSrc) {
    const mainImage = document.getElementById('main-car-image');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
}

// Search and Filter System
function setupSearchAndFilter() {
    const searchInput = document.getElementById('car-search');
    const brandFilter = document.getElementById('brand-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortSelect = document.getElementById('sort-select');

    if (searchInput) {
        searchInput.addEventListener('input', filterCars);
    }
    if (brandFilter) {
        brandFilter.addEventListener('change', filterCars);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', filterCars);
    }
    if (sortSelect) {
        sortSelect.addEventListener('change', filterCars);
    }
}

function filterCars() {
    const searchTerm = document.getElementById('car-search')?.value.toLowerCase() || '';
    const brandFilter = document.getElementById('brand-filter')?.value || '';
    const priceFilter = document.getElementById('price-filter')?.value || '';
    const sortBy = document.getElementById('sort-select')?.value || '';

    let filteredCars = carDatabase.filter(car => {
        const matchesSearch = car.name.toLowerCase().includes(searchTerm) ||
                            car.brand.toLowerCase().includes(searchTerm);
        const matchesBrand = !brandFilter || car.brand === brandFilter;
        const matchesPrice = !priceFilter || checkPriceRange(car.price, priceFilter);

        return matchesSearch && matchesBrand && matchesPrice;
    });

    // Sort cars
    if (sortBy) {
        filteredCars = sortCars(filteredCars, sortBy);
    }

    displayFilteredCars(filteredCars);
}

function checkPriceRange(price, range) {
    switch(range) {
        case 'under-500k': return price < 500000;
        case '500k-1m': return price >= 500000 && price < 1000000;
        case '1m-3m': return price >= 1000000 && price < 3000000;
        case 'over-3m': return price >= 3000000;
        default: return true;
    }
}

function sortCars(cars, sortBy) {
    switch(sortBy) {
        case 'price-low': return cars.sort((a, b) => a.price - b.price);
        case 'price-high': return cars.sort((a, b) => b.price - a.price);
        case 'hp-high': return cars.sort((a, b) => b.hp - a.hp);
        case 'speed-high': return cars.sort((a, b) => b.topSpeed - a.topSpeed);
        case 'name': return cars.sort((a, b) => a.name.localeCompare(b.name));
        default: return cars;
    }
}

function displayFilteredCars(cars) {
    const carsGrid = document.querySelector('.cars-grid');
    if (!carsGrid) return;

    if (cars.length === 0) {
        carsGrid.innerHTML = '<div class="no-results">No cars found matching your criteria.</div>';
        return;
    }

    carsGrid.innerHTML = cars.map(car => createCarCard(car)).join('');
    setupCarCardInteractions();
}

function createCarCard(car) {
    return `
        <div class="car-card" data-car-id="${car.id}">
            <img src="${car.image}" alt="${car.name}">
            <div class="car-info">
                <h3>${car.name}</h3>
                <p>${car.hp} HP • ${car.topSpeed} mph</p>
                <span class="price">$${car.price.toLocaleString()}</span>
            </div>
        </div>
    `;
}

// Chat Widget System
function createChatWidget() {
    const chatWidget = document.createElement('div');
    chatWidget.className = 'chat-widget';
    chatWidget.innerHTML = `
        <div class="chat-toggle" onclick="toggleChat()">
            <span class="chat-icon">💬</span>
            <span class="chat-text">Chat with us</span>
        </div>
        <div class="chat-window" id="chat-window">
            <div class="chat-header">
                <h4>Luxury Motors Support</h4>
                <span class="close-chat" onclick="toggleChat()">&times;</span>
            </div>
            <div class="chat-messages" id="chat-messages">
                <div class="message bot-message">
                    <p>Hello! How can I help you today?</p>
                    <div class="quick-replies">
                        <button onclick="sendQuickReply('I want to schedule a test drive')">Test Drive</button>
                        <button onclick="sendQuickReply('I need financing information')">Financing</button>
                        <button onclick="sendQuickReply('Tell me about your inventory')">Inventory</button>
                    </div>
                </div>
            </div>
            <div class="chat-input">
                <input type="text" id="chat-input-field" placeholder="Type your message...">
                <button onclick="sendMessage()">Send</button>
            </div>
        </div>
    `;

    document.body.appendChild(chatWidget);
}

function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    chatOpen = !chatOpen;

    if (chatOpen) {
        chatWindow.style.display = 'flex';
        setTimeout(() => {
            chatWindow.classList.add('show');
        }, 10);
    } else {
        chatWindow.classList.remove('show');
        setTimeout(() => {
            chatWindow.style.display = 'none';
        }, 300);
    }
}

function sendMessage() {
    const input = document.getElementById('chat-input-field');
    const message = input.value.trim();

    if (message) {
        addChatMessage(message, 'user');
        input.value = '';

        // Simulate bot response
        setTimeout(() => {
            const response = generateBotResponse(message);
            addChatMessage(response, 'bot');
        }, 1000);
    }
}

function sendQuickReply(message) {
    addChatMessage(message, 'user');

    setTimeout(() => {
        const response = generateBotResponse(message);
        addChatMessage(response, 'bot');
    }, 1000);
}

function addChatMessage(message, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = `<p>${message}</p>`;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();

    if (message.includes('test drive') || message.includes('drive')) {
        return "I'd be happy to help you schedule a test drive! Please visit our booking page or call us at (555) 123-LUXURY to schedule an appointment.";
    } else if (message.includes('financing') || message.includes('finance')) {
        return "We offer competitive financing options with rates starting at 2.9% APR. Would you like me to connect you with our financing specialist?";
    } else if (message.includes('inventory') || message.includes('cars')) {
        return "We have an exclusive collection of luxury supercars including Bugatti, McLaren, Lamborghini, Rolls-Royce, and Koenigsegg. Check out our inventory page for the complete collection!";
    } else if (message.includes('price') || message.includes('cost')) {
        return "Our vehicles range from $248,000 to $3,600,000. Each car comes with a comprehensive warranty and white-glove service. Would you like information about a specific model?";
    } else {
        return "Thank you for your message! Our team will get back to you shortly. For immediate assistance, please call us at (555) 123-LUXURY.";
    }
}

// Appointment Booking System
function bookTestDrive(carId) {
    const car = carDatabase.find(c => c.id === carId);
    if (!car) return;

    const modal = createBookingModal(car);
    document.body.appendChild(modal);

    setTimeout(() => {
        modal.classList.add('show');
    }, 100);
}

function createBookingModal(car) {
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Book Test Drive - ${car.name}</h2>
            <form class="booking-form" onsubmit="submitBooking(event, ${car.id})">
                <div class="form-group">
                    <label for="customer-name">Full Name *</label>
                    <input type="text" id="customer-name" required>
                </div>
                <div class="form-group">
                    <label for="customer-email">Email *</label>
                    <input type="email" id="customer-email" required>
                </div>
                <div class="form-group">
                    <label for="customer-phone">Phone *</label>
                    <input type="tel" id="customer-phone" required>
                </div>
                <div class="form-group">
                    <label for="preferred-date">Preferred Date *</label>
                    <input type="date" id="preferred-date" required min="${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label for="preferred-time">Preferred Time *</label>
                    <select id="preferred-time" required>
                        <option value="">Select Time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="special-requests">Special Requests</label>
                    <textarea id="special-requests" rows="3" placeholder="Any special requirements or questions..."></textarea>
                </div>
                <button type="submit" class="btn-primary">Book Test Drive</button>
            </form>
        </div>
    `;

    // Close modal events
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    });

    return modal;
}

function submitBooking(event, carId) {
    event.preventDefault();

    const formData = {
        carId: carId,
        name: document.getElementById('customer-name').value,
        email: document.getElementById('customer-email').value,
        phone: document.getElementById('customer-phone').value,
        date: document.getElementById('preferred-date').value,
        time: document.getElementById('preferred-time').value,
        requests: document.getElementById('special-requests').value
    };

    // Save booking to localStorage (in real app, send to server)
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push({
        ...formData,
        id: Date.now(),
        status: 'pending',
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Close modal
    const modal = event.target.closest('.booking-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 300);

    showNotification('Test drive booked successfully! We will contact you soon.', 'success');
}

// Financing Calculator
function getFinancing(carId) {
    const car = carDatabase.find(c => c.id === carId);
    if (!car) return;

    const modal = createFinancingModal(car);
    document.body.appendChild(modal);

    setTimeout(() => {
        modal.classList.add('show');
    }, 100);
}

function createFinancingModal(car) {
    const modal = document.createElement('div');
    modal.className = 'financing-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Financing Calculator - ${car.name}</h2>
            <div class="financing-content">
                <div class="calculator-section">
                    <div class="form-group">
                        <label for="vehicle-price">Vehicle Price</label>
                        <input type="number" id="vehicle-price" value="${car.price}" readonly>
                    </div>
                    <div class="form-group">
                        <label for="down-payment">Down Payment</label>
                        <input type="number" id="down-payment" value="${Math.round(car.price * 0.2)}" onchange="calculatePayment()">
                    </div>
                    <div class="form-group">
                        <label for="loan-term">Loan Term (months)</label>
                        <select id="loan-term" onchange="calculatePayment()">
                            <option value="36">36 months</option>
                            <option value="48">48 months</option>
                            <option value="60" selected>60 months</option>
                            <option value="72">72 months</option>
                            <option value="84">84 months</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="interest-rate">Interest Rate (%)</label>
                        <input type="number" id="interest-rate" value="3.9" step="0.1" onchange="calculatePayment()">
                    </div>
                    <div class="form-group">
                        <label for="trade-in-value">Trade-in Value (optional)</label>
                        <input type="number" id="trade-in-value" value="0" onchange="calculatePayment()">
                    </div>
                </div>
                <div class="results-section">
                    <h3>Payment Breakdown</h3>
                    <div class="payment-result">
                        <div class="result-item">
                            <span class="label">Monthly Payment:</span>
                            <span class="value" id="monthly-payment">$0</span>
                        </div>
                        <div class="result-item">
                            <span class="label">Total Interest:</span>
                            <span class="value" id="total-interest">$0</span>
                        </div>
                        <div class="result-item">
                            <span class="label">Total Amount:</span>
                            <span class="value" id="total-amount">$0</span>
                        </div>
                    </div>
                    <button class="btn-primary" onclick="applyForFinancing(${car.id})">Apply for Financing</button>
                </div>
            </div>
        </div>
    `;

    // Close modal events
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    });

    // Calculate initial payment
    setTimeout(() => calculatePayment(), 100);

    return modal;
}

function calculatePayment() {
    const vehiclePrice = parseFloat(document.getElementById('vehicle-price').value) || 0;
    const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
    const loanTerm = parseInt(document.getElementById('loan-term').value) || 60;
    const interestRate = parseFloat(document.getElementById('interest-rate').value) || 3.9;
    const tradeInValue = parseFloat(document.getElementById('trade-in-value').value) || 0;

    const loanAmount = vehiclePrice - downPayment - tradeInValue;
    const monthlyRate = (interestRate / 100) / 12;

    let monthlyPayment = 0;
    let totalInterest = 0;

    if (loanAmount > 0 && monthlyRate > 0) {
        monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
                        (Math.pow(1 + monthlyRate, loanTerm) - 1);
        totalInterest = (monthlyPayment * loanTerm) - loanAmount;
    }

    const totalAmount = loanAmount + totalInterest;

    document.getElementById('monthly-payment').textContent = `$${monthlyPayment.toLocaleString('en-US', {maximumFractionDigits: 2})}`;
    document.getElementById('total-interest').textContent = `$${totalInterest.toLocaleString('en-US', {maximumFractionDigits: 2})}`;
    document.getElementById('total-amount').textContent = `$${totalAmount.toLocaleString('en-US', {maximumFractionDigits: 2})}`;
}

function applyForFinancing(carId) {
    showNotification('Financing application initiated! Our finance team will contact you within 24 hours.', 'success');

    // Close modal
    const modal = document.querySelector('.financing-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// Language System
function setupLanguage() {
    const savedLanguage = localStorage.getItem('language') || 'en';
    currentLanguage = savedLanguage;
    updateLanguageDisplay();
    createLanguageSelector();
}

function createLanguageSelector() {
    const languageSelector = document.createElement('div');
    languageSelector.className = 'language-selector';
    languageSelector.innerHTML = `
        <select onchange="changeLanguage(this.value)">
            <option value="en" ${currentLanguage === 'en' ? 'selected' : ''}>English</option>
            <option value="es" ${currentLanguage === 'es' ? 'selected' : ''}>Español</option>
            <option value="fr" ${currentLanguage === 'fr' ? 'selected' : ''}>Français</option>
        </select>
    `;

    const navbar = document.querySelector('.nav-container');
    if (navbar) {
        navbar.appendChild(languageSelector);
    }
}

function changeLanguage(language) {
    currentLanguage = language;
    localStorage.setItem('language', language);
    updateLanguageDisplay();
}

function updateLanguageDisplay() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// Parallax Effects
function setupParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');

        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Loading Animations
function setupLoadingAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

// Form Submissions
function setupFormSubmissions() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterForm);
    }
}

function handleContactForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Save to localStorage (in real app, send to server)
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push({
        ...data,
        id: Date.now(),
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('contacts', JSON.stringify(contacts));

    showNotification('Message sent successfully! We will contact you soon.', 'success');
    event.target.reset();
}

function handleNewsletterForm(event) {
    event.preventDefault();

    const email = event.target.querySelector('input[type="email"]').value;

    // Save to localStorage (in real app, send to server)
    const subscribers = JSON.parse(localStorage.getItem('newsletter')) || [];
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletter', JSON.stringify(subscribers));
        showNotification('Successfully subscribed to newsletter!', 'success');
    } else {
        showNotification('Email already subscribed!', 'warning');
    }

    event.target.reset();
}

// Initialize chat input enter key
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.id === 'chat-input-field') {
        sendMessage();
    }
});

// Image Carousel Functionality
let currentCarouselSlideIndex = 0;
const totalCarouselSlides = 5;

function moveCarousel(direction) {
    currentCarouselSlideIndex += direction;

    if (currentCarouselSlideIndex >= totalCarouselSlides) {
        currentCarouselSlideIndex = 0;
    } else if (currentCarouselSlideIndex < 0) {
        currentCarouselSlideIndex = totalCarouselSlides - 1;
    }

    updateCarousel();
}

function currentCarouselSlide(slideIndex) {
    currentCarouselSlideIndex = slideIndex - 1;
    updateCarousel();
}

function updateCarousel() {
    const track = document.getElementById('carousel-track');
    const indicators = document.querySelectorAll('.indicator');

    if (track) {
        const translateX = -currentCarouselSlideIndex * 100;
        track.style.transform = `translateX(${translateX}%)`;
    }

    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentCarouselSlideIndex);
    });
}

// Auto-play carousel
function startCarouselAutoplay() {
    setInterval(() => {
        moveCarousel(1);
    }, 5000); // Change slide every 5 seconds
}

// Video Preview Modal
function openVideoPreview(videoSrc) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('video-preview-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'video-preview-modal';
        modal.className = 'video-preview-modal';
        modal.innerHTML = `
            <div class="video-preview-content">
                <span class="video-preview-close" onclick="closeVideoPreview()">&times;</span>
                <video controls autoplay>
                    <source src="" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        `;
        document.body.appendChild(modal);

        // Close on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeVideoPreview();
            }
        });
    }

    const video = modal.querySelector('video');
    video.src = videoSrc;
    modal.classList.add('show');
}

function closeVideoPreview() {
    const modal = document.getElementById('video-preview-modal');
    if (modal) {
        const video = modal.querySelector('video');
        video.pause();
        video.src = '';
        modal.classList.remove('show');
    }
}

// Enhanced Image Gallery with Lightbox
function createImageLightbox() {
    // Add click events to all car images
    document.querySelectorAll('.car-card img, .gallery-item img').forEach(img => {
        img.addEventListener('click', function() {
            openImageLightbox(this.src, this.alt);
        });
    });
}

function openImageLightbox(imageSrc, imageAlt) {
    // Create lightbox if it doesn't exist
    let lightbox = document.getElementById('image-lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'image-lightbox';
        lightbox.className = 'video-preview-modal';
        lightbox.innerHTML = `
            <div class="video-preview-content">
                <span class="video-preview-close" onclick="closeImageLightbox()">&times;</span>
                <img src="" alt="" style="width: 100%; height: 100%; object-fit: contain; border-radius: 10px;">
            </div>
        `;
        document.body.appendChild(lightbox);

        // Close on background click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeImageLightbox();
            }
        });
    }

    const img = lightbox.querySelector('img');
    img.src = imageSrc;
    img.alt = imageAlt;
    lightbox.classList.add('show');
}

function closeImageLightbox() {
    const lightbox = document.getElementById('image-lightbox');
    if (lightbox) {
        lightbox.classList.remove('show');
    }
}

// Enhanced Media Loading
function preloadImages() {
    const imageUrls = [
        'assets/images/BACKBUG.jpg',
        'assets/images/BACKBUG2.jpg',
        'assets/images/chiron.jpg',
        'assets/images/mclaren.jpg',
        'assets/images/hurican.jpg',
        'assets/images/sian.jpg',
        'assets/images/rolls1.jpg',
        'assets/images/jesko.jpg',
        'assets/images/divo2.jpg',
        'assets/images/mc720.jpg',
        'assets/images/ursu.jpg',
        'assets/images/rols2.jpg',
        'assets/images/rev.jpg',
        'assets/images/back1.jpeg',
        'assets/images/b1.jpeg'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Image Lazy Loading
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Enhanced Slideshow with Touch Support
function setupTouchCarousel() {
    const carousel = document.querySelector('.carousel-container');
    if (!carousel) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;

        const diffX = startX - currentX;
        if (Math.abs(diffX) > 50) { // Minimum swipe distance
            if (diffX > 0) {
                moveCarousel(1); // Swipe left - next slide
            } else {
                moveCarousel(-1); // Swipe right - previous slide
            }
        }
    });
}

// Image Zoom Effect
function setupImageZoom() {
    document.querySelectorAll('.car-card img').forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });

        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize all media features
document.addEventListener('DOMContentLoaded', function() {
    // Start carousel autoplay
    if (document.getElementById('carousel-track')) {
        startCarouselAutoplay();
        setupTouchCarousel();
    }

    // Setup image features
    createImageLightbox();
    preloadImages();
    setupLazyLoading();
    setupImageZoom();
});

// Close modals on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeVideoPreview();
        closeImageLightbox();
    }
});
