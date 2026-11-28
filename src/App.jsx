
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import './App.css'
import TravelMap from './components/TravelMap'
import TravelJournal from './components/TravelJournal'

import tajmahal from './assets/tajmahal.jpg'
import jaipur from './assets/jaipur.jpg'
import goa from './assets/goa.jpg'
import munnar from './assets/munnar.jpg'
import ladakh from './assets/ladakh.jpg'
import meghalaya from './assets/meghalaya.jpg'
import hampi from './assets/hampi.jpg'
import varanasi from './assets/varanasi.jpg'

// DESTINATION DATA
const destinations = [
  {
    name: 'Taj Mahal',
    country: 'Agra, Uttar Pradesh',
    category: 'Culture',
    image: tajmahal,
    description: 'Experience the beauty of the Taj Mahal, one of India’s most iconic monuments and a symbol of eternal love.',
    budget: '₹4,000 – ₹7,000',
    bestTime: 'October – March',
    duration: '1–2 days'
  },
  {
    name: 'Jaipur',
    country: 'Rajasthan',
    category: 'Culture',
    image: jaipur,
    description: 'Discover royal palaces, colorful markets and the beautiful pink architecture of Rajasthan.',
    budget: '₹6,000 – ₹10,000',
    bestTime: 'October – March',
    duration: '2–3 days'
  },
  {
    name: 'Goa',
    country: 'Goa',
    category: 'Beach',
    image: goa,
    description: 'Relax on beautiful beaches, enjoy coastal sunsets and explore the vibrant culture of Goa.',
    budget: '₹8,000 – ₹15,000',
    bestTime: 'November – February',
    duration: '3–4 days'
  },
  {
    name: 'Munnar',
    country: 'Kerala',
    category: 'Nature',
    image: munnar,
    description: 'Escape into peaceful green hills, tea plantations and misty landscapes in Kerala.',
    budget: '₹7,000 – ₹12,000',
    bestTime: 'September – March',
    duration: '2–3 days'
  },
  {
    name: 'Ladakh',
    country: 'Jammu and Kashmir region',
    category: 'Nature',
    image: ladakh,
    description: 'Explore breathtaking mountain landscapes, high-altitude lakes and unforgettable road trips.',
    budget: '₹18,000 – ₹30,000',
    bestTime: 'May – September',
    duration: '5–7 days'
  },
  {
    name: 'Meghalaya',
    country: 'Meghalaya',
    category: 'Nature',
    image: meghalaya,
    description: 'Discover waterfalls, lush forests and the magical living root bridges of Northeast India.',
    budget: '₹12,000 – ₹20,000',
    bestTime: 'October – April',
    duration: '4–6 days'
  },
  {
    name: 'Hampi',
    country: 'Karnataka',
    category: 'Heritage',
    image: hampi,
    description: 'Walk through ancient temples, historic ruins and remarkable stone architecture.',
    budget: '₹4,000 – ₹7,000',
    bestTime: 'October – February',
    duration: '2 days'
  },
  {
    name: 'Varanasi',
    country: 'Uttar Pradesh',
    category: 'Culture',
    image: varanasi,
    description: 'Experience the spiritual atmosphere, historic ghats and timeless traditions of Varanasi.',
    budget: '₹4,000 – ₹7,000',
    bestTime: 'October – March',
    duration: '2–3 days'
  }
]

const categories = ['All', 'Beach', 'Nature', 'Culture', 'Heritage']

const STORAGE_KEY = 'travel-favorites'
const TRIP_STORAGE_KEY = 'wanderly-my-trip'
const ITINERARY_STORAGE_KEY = 'wanderly-itinerary'

// LOCAL STORAGE HELPERS
function getSavedFavorites() {
  try {
    const savedFavorites = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )

    if (!Array.isArray(savedFavorites)) return []

    return destinations
      .filter((destination) => savedFavorites.includes(destination.name))
      .map((destination) => destination.name)
  } catch {
    return []
  }
}

function getSavedTrip() {
  try {
    const savedTrip = JSON.parse(
      localStorage.getItem(TRIP_STORAGE_KEY) || '[]'
    )

    if (!Array.isArray(savedTrip)) return []

    return destinations
      .filter((destination) => savedTrip.includes(destination.name))
      .map((destination) => destination.name)
  } catch {
    return []
  }
}

function getSavedItinerary() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(ITINERARY_STORAGE_KEY) || '{}'
    )

    return {
      travelStartDate: saved.travelStartDate || '',
      travelEndDate: saved.travelEndDate || '',
      itinerary: Array.isArray(saved.itinerary) ? saved.itinerary : []
    }
  } catch {
    return {
      travelStartDate: '',
      travelEndDate: '',
      itinerary: []
    }
  }
}

// MAIN APP
function App() {
  const modalRef = useRef(null)
  const triggerRef = useRef(null)

  // INITIAL DATA
  const [savedItinerary] = useState(getSavedItinerary)

  // DESTINATION STATES
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [favorites, setFavorites] = useState(getSavedFavorites)
  const [showFavorites, setShowFavorites] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState(null)

  // NAVIGATION STATE
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // TRIP STATES
  const [myTrip, setMyTrip] = useState(getSavedTrip)

  // ITINERARY STATES
  const [travelStartDate, setTravelStartDate] = useState(
    () => savedItinerary.travelStartDate
  )
  const [travelEndDate, setTravelEndDate] = useState(
    () => savedItinerary.travelEndDate
  )
  const [itinerary, setItinerary] = useState(
    () => savedItinerary.itinerary
  )
  const [activityDestination, setActivityDestination] = useState('')
  const [activityName, setActivityName] = useState('')

  // SAVE FAVOURITES
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch (error) {
      console.error('Unable to save favorites:', error)
    }
  }, [favorites])

  // SAVE MY TRIP
  useEffect(() => {
    try {
      localStorage.setItem(TRIP_STORAGE_KEY, JSON.stringify(myTrip))
    } catch (error) {
      console.error('Unable to save trip:', error)
    }
  }, [myTrip])

  // SAVE ITINERARY
  useEffect(() => {
    try {
      localStorage.setItem(
        ITINERARY_STORAGE_KEY,
        JSON.stringify({
          travelStartDate,
          travelEndDate,
          itinerary
        })
      )
    } catch (error) {
      console.error('Unable to save itinerary:', error)
    }
  }, [travelStartDate, travelEndDate, itinerary])

  // CLOSE MOBILE MENU USING ESCAPE
  useEffect(() => {
    if (!isMenuOpen) return

    function handleMenuKeyDown(event) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleMenuKeyDown)

    return () => {
      window.removeEventListener('keydown', handleMenuKeyDown)
    }
  }, [isMenuOpen])

  // FOCUS THE DESTINATION MODAL
  useLayoutEffect(() => {
    if (!selectedDestination) return

    modalRef.current?.focus()

    return () => {
      triggerRef.current?.focus()
      triggerRef.current = null
    }
  }, [selectedDestination])

  // MODAL KEYBOARD ACCESSIBILITY
  useEffect(() => {
    if (!selectedDestination) return

    function handleModalKeyDown(event) {
      if (event.key === 'Escape') {
        setSelectedDestination(null)
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = modalRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )

      if (!focusableElements?.length) {
        event.preventDefault()
        modalRef.current?.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (document.activeElement === modalRef.current) {
        event.preventDefault()
        ;(event.shiftKey ? lastElement : firstElement).focus()
        return
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleModalKeyDown)

    return () => {
      window.removeEventListener('keydown', handleModalKeyDown)
    }
  }, [selectedDestination])

  // PREVENT BACKGROUND SCROLL WHILE MODAL IS OPEN
  useEffect(() => {
    if (!selectedDestination) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [selectedDestination])

  // TOGGLE FAVOURITES
  function toggleFavorite(name) {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(name)
        ? currentFavorites.filter((item) => item !== name)
        : [...currentFavorites, name]
    )
  }

  // ADD OR REMOVE TRIP DESTINATIONS
  function toggleTripDestination(name) {
    if (myTrip.includes(name)) {
      setMyTrip((currentTrip) =>
        currentTrip.filter((item) => item !== name)
      )

      setItinerary((current) =>
        current.filter((activity) => activity.destination !== name)
      )

      if (activityDestination === name) {
        setActivityDestination('')
      }
    } else {
      setMyTrip((currentTrip) => [...currentTrip, name])
    }
  }

  // SEARCH AND FILTER DESTINATIONS
  const filteredDestinations = destinations.filter((destination) => {
    const searchText = search.trim().toLowerCase()

    const matchesSearch =
      destination.name.toLowerCase().includes(searchText) ||
      destination.country.toLowerCase().includes(searchText)

    const matchesCategory =
      category === 'All' || destination.category === category

    const matchesFavorites =
      !showFavorites || favorites.includes(destination.name)

    return matchesSearch && matchesCategory && matchesFavorites
  })

  // OPEN DESTINATION DETAILS
  function openDestination(destination, event) {
    triggerRef.current = event.currentTarget
    setSelectedDestination(destination)
  }

  // CALCULATE TRIP SUMMARY
  const tripDestinations = destinations.filter(
    (destination) => myTrip.includes(destination.name)
  )

  const tripBudget = tripDestinations.reduce(
    (total, destination) => {
      const amounts = destination.budget
        .split('–')
        .map((amount) => Number(amount.replace(/[^\d]/g, '')))

      return [
        total[0] + amounts[0],
        total[1] + amounts[1]
      ]
    },
    [0, 0]
  )

  const travelDays =
    travelStartDate &&
    travelEndDate &&
    travelEndDate >= travelStartDate
      ? Math.floor(
          (new Date(`${travelEndDate}T00:00:00`) -
            new Date(`${travelStartDate}T00:00:00`)) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : 0

  const tripDuration = tripDestinations.reduce(
    (total, destination) => {
      const days = destination.duration.match(/\d+/g).map(Number)

      return [
        total[0] + days[0],
        total[1] + days[days.length - 1]
      ]
    },
    [0, 0]
  )

  // ADD ITINERARY ACTIVITY
  function handleAddActivity(event) {
    event.preventDefault()

    if (
      travelStartDate &&
      travelEndDate &&
      travelEndDate < travelStartDate
    ) {
      alert('Return date must be after your departure date.')
      return
    }

    if (!activityDestination || !activityName.trim()) {
      alert('Please select a destination and enter an activity.')
      return
    }

    const newActivity = {
      id: Date.now(),
      destination: activityDestination,
      name: activityName.trim()
    }

    setItinerary((current) => [...current, newActivity])
    setActivityName('')
  }

  return (
    <>
      {/* NAVBAR */}
      <header className="navbar" id="home">
        <a href="#home" className="logo" aria-label="Wanderly home">
          Wanderly<span>.</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <nav
          id="main-navigation"
          className={isMenuOpen ? 'nav-open' : ''}
          aria-label="Main navigation"
        >
          <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#destinations" onClick={() => setIsMenuOpen(false)}>Destinations</a>
          <a href="#travel-map" onClick={() => setIsMenuOpen(false)}>Explore Map</a>
          <a href="#my-trip" onClick={() => setIsMenuOpen(false)}>My Trip</a>
          <a href="#itinerary" onClick={() => setIsMenuOpen(false)}>Itinerary</a>
          <a href="#journal" onClick={() => setIsMenuOpen(false)}>Travel Journal</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
        </nav>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-content">
            <span className="hero-tag">
              ✦ DISCOVER INCREDIBLE INDIA
            </span>

            <h1>
              Explore India.
              <br />
              <span>Find your escape.</span>
            </h1>

            <p>
              From peaceful mountains to golden beaches,
              discover the beauty, culture and hidden gems
              of incredible India.
            </p>

            <a href="#destinations" className="hero-button">
              Explore Destinations →
            </a>
          </div>

          <div className="hero-bottom">
            <span>DISCOVER · EXPLORE · EXPERIENCE INDIA</span>
            <span>01 / 08</span>
          </div>
        </section>

        {/* TRAVEL HIGHLIGHTS */}
        <section
          className="journey-highlights"
          aria-label="Wanderly highlights"
        >
          <div className="highlight-item">
            <span className="highlight-number">08</span>
            <div>
              <h3>Handpicked destinations</h3>
              <p>Discover remarkable places across India</p>
            </div>
          </div>

          <div className="highlight-item">
            <span className="highlight-number">04</span>
            <div>
              <h3>Travel styles</h3>
              <p>Beaches, nature, culture and heritage</p>
            </div>
          </div>

          <div className="highlight-item">
            <span className="highlight-number">01</span>
            <div>
              <h3>Unforgettable country</h3>
              <p>One incredible journey through India</p>
            </div>
          </div>
        </section>

        {/* DESTINATIONS SECTION */}
        <section className="destinations" id="destinations">
          <div className="section-heading">
            <div>
              <span className="section-tag">✦ INCREDIBLE INDIA</span>
              <h2>Explore beautiful India</h2>
              <p>
                From hidden gems to iconic places,
                find your next Indian adventure.
              </p>
            </div>

            <span className="view-all">DISCOVER INDIA</span>
          </div>

          {/* SEARCH AND CATEGORY FILTERS */}
          <div className="destination-tools">
            <input
              type="search"
              placeholder="Search destinations or states..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search destinations or states"
            />

            <div
              className="category-filters"
              role="group"
              aria-label="Filter by category"
            >
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={category === item ? 'active-filter' : ''}
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* FAVOURITES FILTER */}
          <button
            type="button"
            className={`favorites-toggle ${
              showFavorites ? 'active-favorites' : ''
            }`}
            onClick={() => setShowFavorites((current) => !current)}
            aria-pressed={showFavorites}
          >
            ♥{' '}
            {showFavorites
              ? 'Show All Destinations'
              : `My Favorites (${favorites.length})`}
          </button>

          {/* DESTINATION CARDS */}
          <div className="destination-grid">
            {filteredDestinations.map((destination) => {
              const isFavorite = favorites.includes(destination.name)

              return (
                <article
                  className="destination-card"
                  key={destination.name}
                >
                  <button
                    type="button"
                    className="destination-card-button"
                    onClick={(event) => openDestination(destination, event)}
                    aria-label={`View ${destination.name} details`}
                  >
                    <img
                      src={destination.image}
                      alt={`${destination.name}, ${destination.country}`}
                      loading="lazy"
                    />

                    <div className="card-info">
                      <span>{destination.country.toUpperCase()}</span>
                      <h3>{destination.name}</h3>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`favorite-button ${
                      isFavorite ? 'is-favorite' : ''
                    }`}
                    onClick={() => toggleFavorite(destination.name)}
                    aria-label={
                      isFavorite
                        ? `Remove ${destination.name} from favorites`
                        : `Add ${destination.name} to favorites`
                    }
                    aria-pressed={isFavorite}
                  >
                    {isFavorite ? '♥' : '♡'}
                  </button>
                </article>
              )
            })}
          </div>

          {/* EMPTY SEARCH / FAVOURITES MESSAGE */}
          {filteredDestinations.length === 0 && (
            <p className="empty-message" role="status">
              {showFavorites && favorites.length === 0
                ? 'You have not saved any destinations yet. Tap the heart on a destination to add it!'
                : 'No destinations found. Try another search or category!'}
            </p>
          )}
        </section>

        {/* INTERACTIVE TRAVEL MAP */}
        <TravelMap destinations={destinations} myTrip={myTrip} />

        {/* MY TRIP SECTION */}
        <section className="my-trip-section" id="my-trip">
          <div className="section-heading">
            <div>
              <span className="section-tag">✦ YOUR JOURNEY</span>
              <h2>My Trip</h2>
              <p>Your saved destinations, all in one place.</p>
            </div>

            <span className="view-all">
              {myTrip.length}{' '}
              {myTrip.length === 1 ? 'DESTINATION' : 'DESTINATIONS'}
            </span>
          </div>

          {/* TRIP BUDGET AND DURATION SUMMARY */}
          {myTrip.length > 0 && (
            <div className="trip-budget-summary">
              <span>ESTIMATED TOTAL BUDGET</span>
              <strong>
                ₹{tripBudget[0].toLocaleString('en-IN')} – ₹
                {tripBudget[1].toLocaleString('en-IN')}
              </strong>
              <small>
                Combined estimate for {tripDestinations.length} selected destinations
              </small>

              <div className="trip-duration-summary">
                <span>TOTAL RECOMMENDED DURATION</span>
                <strong>{tripDuration[0]} – {tripDuration[1]} days</strong>
                <small>
                  Combined recommended stay across your destinations
                </small>
              </div>

              <button
                type="button"
                className="clear-trip-button"
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear your entire trip?')) {
                    setMyTrip([])
                    setItinerary([])
                    setTravelStartDate('')
                    setTravelEndDate('')
                    setActivityDestination('')
                    setActivityName('')
                  }
                }}
              >
                Clear My Trip
              </button>
            </div>
          )}

          {/* EMPTY TRIP / SAVED DESTINATIONS */}
          {myTrip.length === 0 ? (
            <div className="my-trip-empty">
              <span className="empty-trip-icon">✈</span>
              <h3>Your journey starts here</h3>
              <p>
                Explore destinations and add your favourites
                to create your personal trip.
              </p>
              <a href="#destinations" className="hero-button">
                Explore Destinations →
              </a>
            </div>
          ) : (
            <div className="my-trip-grid">
              {tripDestinations.map((destination) => (
                <article className="my-trip-card" key={destination.name}>
                  <img
                    src={destination.image}
                    alt={destination.name}
                    loading="lazy"
                  />

                  <div className="my-trip-card-info">
                    <span>{destination.country}</span>
                    <h3>{destination.name}</h3>
                    <p>Budget: {destination.budget}</p>
                    <p>Duration: {destination.duration}</p>

                    <button
                      type="button"
                      onClick={() => toggleTripDestination(destination.name)}
                    >
                      Remove from trip
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ITINERARY PLANNER */}
        <section className="itinerary-section" id="itinerary">
          <div className="section-heading">
            <div>
              <span className="section-tag">✦ PLAN YOUR ADVENTURE</span>
              <h2>Trip Itinerary</h2>
              <p>Choose your travel dates and organise your journey.</p>
            </div>
          </div>

          {/* TRAVEL DATES */}
          <div className="itinerary-date-form">
            <div className="date-field">
              <label htmlFor="travel-start">Departure Date</label>
              <input
                type="date"
                id="travel-start"
                value={travelStartDate}
                onChange={(event) => {
                  const newStartDate = event.target.value

                  setTravelStartDate(newStartDate)

                  if (travelEndDate && travelEndDate < newStartDate) {
                    setTravelEndDate('')
                  }
                }}
              />
            </div>

            <div className="date-field">
              <label htmlFor="travel-end">Return Date</label>
              <input
                type="date"
                id="travel-end"
                value={travelEndDate}
                onChange={(event) => setTravelEndDate(event.target.value)}
                min={travelStartDate || undefined}
                disabled={!travelStartDate}
              />
            </div>
          </div>

          {travelStartDate &&
            travelEndDate &&
            travelEndDate < travelStartDate && (
              <p className="date-error" role="alert">
                Return date must be after your departure date.
              </p>
            )}

          {/* ITINERARY NOTICE */}
          {tripDestinations.length === 0 && (
            <p className="itinerary-notice">
              Add at least one destination to My Trip before planning activities.
              <a href="#destinations"> Explore destinations →</a>
            </p>
          )}

          {/* ADD ACTIVITY FORM */}
          <form className="activity-form" onSubmit={handleAddActivity}>
            <h3>Add an Activity</h3>

            <div className="activity-form-fields">
              <div className="date-field">
                <label htmlFor="activity-destination">Choose Destination</label>
                <select
                  id="activity-destination"
                  value={activityDestination}
                  onChange={(event) => setActivityDestination(event.target.value)}
                  required
                  disabled={tripDestinations.length === 0}
                >
                  <option value="">Select a destination</option>
                  {tripDestinations.map((destination) => (
                    <option key={destination.name} value={destination.name}>
                      {destination.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="date-field">
                <label htmlFor="activity-name">Activity</label>
                <input
                  id="activity-name"
                  type="text"
                  placeholder="e.g. Visit local attractions"
                  value={activityName}
                  onChange={(event) => setActivityName(event.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="add-activity-button"
              disabled={tripDestinations.length === 0}
            >
              + Add Activity
            </button>
          </form>

          {/* TRAVEL DATE SUMMARY */}
          {travelStartDate && travelEndDate && (
            <div className="trip-date-summary">
              <span>YOUR TRAVEL DATES</span>
              <strong>
                {new Date(`${travelStartDate}T00:00:00`).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
                {' — '}
                {new Date(`${travelEndDate}T00:00:00`).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </strong>

              {travelDays > 0 && (
                <p className="travel-days-count">
                  {travelDays} {travelDays === 1 ? 'day' : 'days'} planned
                </p>
              )}
            </div>
          )}

          {/* PLANNED ACTIVITIES */}
          <div className="planned-activities">
            <h3>Your Planned Activities</h3>

            {itinerary.length === 0 ? (
              <p className="empty-itinerary">
                No activities added yet. Start planning your adventure!
              </p>
            ) : (
              <div className="activity-list">
                {itinerary.map((activity) => (
                  <div className="activity-item" key={activity.id}>
                    <div>
                      <span>{activity.destination}</span>
                      <h4>{activity.name}</h4>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setItinerary((current) =>
                          current.filter((item) => item.id !== activity.id)
                        )
                      }
                      aria-label={`Remove ${activity.name}`}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* TRAVEL JOURNAL SECTION */}
        <TravelJournal destinations={destinations} />

        {/* ABOUT SECTION */}
        <section className="about" id="about">
          <span className="section-tag">✦ OUR STORY</span>

          <h2>
            India is not just a destination.
            It's an experience.
          </h2>

          <p>
            At Wanderly, we believe every journey tells a story.
            From the mountains of the North to the beaches of
            the South, discover the incredible diversity of India
            and create memories that last forever.
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <a href="#home" className="logo">
          Wanderly<span>.</span>
        </a>

        <p>Discover India. Create unforgettable memories.</p>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#destinations">Destinations</a>
          <a href="#about">About Us</a>
        </div>

        <div className="footer-bottom">
          © 2026 Wanderly. All rights reserved.
        </div>
      </footer>

      {/* DESTINATION DETAILS MODAL */}
      {selectedDestination && (
        <div
          className="destination-modal"
          onClick={() => setSelectedDestination(null)}
        >
          <div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            ref={modalRef}
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedDestination(null)}
              aria-label="Close destination details"
            >
              ×
            </button>

            <img
              src={selectedDestination.image}
              alt={`${selectedDestination.name}, ${selectedDestination.country}`}
            />

            <div className="modal-info">
              <span>{selectedDestination.country.toUpperCase()}</span>

              <h2 id="modal-title">{selectedDestination.name}</h2>

              <p>{selectedDestination.description}</p>

              <div className="destination-details">
                <div className="detail-item">
                  <span>ESTIMATED BUDGET</span>
                  <strong>{selectedDestination.budget}</strong>
                  <small>Per person · Excluding travel to destination</small>
                </div>

                <div className="detail-item">
                  <span>BEST TIME TO VISIT</span>
                  <strong>{selectedDestination.bestTime}</strong>
                </div>

                <div className="detail-item">
                  <span>RECOMMENDED DURATION</span>
                  <strong>{selectedDestination.duration}</strong>
                </div>

                <button
                  type="button"
                  className="my-trip-button"
                  onClick={() => toggleTripDestination(selectedDestination.name)}
                >
                  {myTrip.includes(selectedDestination.name)
                    ? '✓ Remove from My Trip'
                    : '+ Add to My Trip'}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDestination(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
