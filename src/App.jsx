
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import './App.css'

import tajmahal from './assets/tajmahal.jpg'
import jaipur from './assets/jaipur.jpg'
import goa from './assets/goa.jpg'
import munnar from './assets/munnar.jpg'
import ladakh from './assets/ladakh.jpg'
import meghalaya from './assets/meghalaya.jpg'
import hampi from './assets/hampi.jpg'
import varanasi from './assets/varanasi.jpg'

const destinations = [
  {
    name: 'Taj Mahal',
    country: 'Agra, Uttar Pradesh',
    category: 'Culture',
    image: tajmahal,
    description: 'Experience the beauty of the Taj Mahal, one of India’s most iconic monuments and a symbol of eternal love.'
  },
  {
    name: 'Jaipur',
    country: 'Rajasthan',
    category: 'Culture',
    image: jaipur,
    description: 'Discover royal palaces, colorful markets and the beautiful pink architecture of Rajasthan.'
  },
  {
    name: 'Goa',
    country: 'Goa',
    category: 'Beach',
    image: goa,
    description: 'Relax on beautiful beaches, enjoy coastal sunsets and explore the vibrant culture of Goa.'
  },
  {
    name: 'Munnar',
    country: 'Kerala',
    category: 'Nature',
    image: munnar,
    description: 'Escape into peaceful green hills, tea plantations and misty landscapes in Kerala.'
  },
  {
    name: 'Ladakh',
    country: 'Jammu and Kashmir region',
    category: 'Nature',
    image: ladakh,
    description: 'Explore breathtaking mountain landscapes, high-altitude lakes and unforgettable road trips.'
  },
  {
    name: 'Meghalaya',
    country: 'Meghalaya',
    category: 'Nature',
    image: meghalaya,
    description: 'Discover waterfalls, lush forests and the magical living root bridges of Northeast India.'
  },
  {
    name: 'Hampi',
    country: 'Karnataka',
    category: 'Heritage',
    image: hampi,
    description: 'Walk through ancient temples, historic ruins and remarkable stone architecture.'
  },
  {
    name: 'Varanasi',
    country: 'Uttar Pradesh',
    category: 'Culture',
    image: varanasi,
    description: 'Experience the spiritual atmosphere, historic ghats and timeless traditions of Varanasi.'
  },
]

const categories = ['All', 'Beach', 'Nature', 'Culture', 'Heritage']

const STORAGE_KEY = 'travel-favorites'

function getSavedFavorites() {
  try {
    const savedFavorites = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )

    if (!Array.isArray(savedFavorites)) {
      return []
    }

    // Keep only favourites belonging to current destinations
    return destinations
      .filter((destination) =>
        savedFavorites.includes(destination.name)
      )
      .map((destination) => destination.name)
  } catch {
    return []
  }
}

function App() {
  const modalRef = useRef(null)
  const triggerRef = useRef(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [favorites, setFavorites] = useState(getSavedFavorites)
  const [showFavorites, setShowFavorites] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState(null)

  // Save favourites whenever they change
  useEffect(() => {
  try {
    localStorage.setItem('travel-favorites', JSON.stringify(favorites))
  } catch (error) {
    console.error('Unable to save favorites:', error)
  }
}, [favorites])

   useLayoutEffect(() => {
  if (!selectedDestination) return

  modalRef.current?.focus()

  return () => {
    triggerRef.current?.focus()
    triggerRef.current = null
  }
}, [selectedDestination])
  // Close destination popup using Escape key
  useEffect(() => {
    if (!selectedDestination) return

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setSelectedDestination(null)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [selectedDestination])

  // Add or remove a destination from favourites
  function toggleFavorite(name) {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(name)
        ? currentFavorites.filter((item) => item !== name)
        : [...currentFavorites, name]
    )
  }

  // Search and filter destinations
  const filteredDestinations = destinations.filter((destination) => {
    const searchText = search.trim().toLowerCase()

    const matchesSearch =
      destination.name.toLowerCase().includes(searchText) ||
      destination.country.toLowerCase().includes(searchText)

    const matchesCategory =
      category === 'All' ||
      destination.category === category

    const matchesFavorites =
      !showFavorites ||
      favorites.includes(destination.name)

    return (
      matchesSearch &&
      matchesCategory &&
      matchesFavorites
    )
  })

  function openDestination(destination, event) {
  triggerRef.current = event.currentTarget
  setSelectedDestination(destination)
}


  return (
    <>
      {/* NAVBAR */}
      <header className="navbar" id="home">
        <a href="#home" className="logo" aria-label="Wanderly home">
          Wanderly<span>.</span>
        </a>

        <nav aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#destinations">Destinations</a>
          <a href="#about">About</a>
        </nav>

        <a href="#destinations" className="nav-button">
          Explore India
        </a>
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
            <span>
              DISCOVER · EXPLORE · EXPERIENCE INDIA
            </span>
            <span>01 / 08</span>
          </div>
        </section>

        {/* DESTINATIONS SECTION */}
        <section className="destinations" id="destinations">
          <div className="section-heading">
            <div>
              <span className="section-tag">
                ✦ INCREDIBLE INDIA
              </span>

              <h2>Explore beautiful India</h2>

              <p>
                From hidden gems to iconic places,
                find your next Indian adventure.
              </p>
            </div>

            <span className="view-all">
              DISCOVER INDIA
            </span>
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
              aria-label="Filter by category"
            >
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={
                    category === item ? 'active-filter' : ''
                  }
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
      <span>
        {destination.country.toUpperCase()}
      </span>

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
            <p className="empty-message">
              {showFavorites && favorites.length === 0
                ? 'You have not saved any destinations yet. Tap the heart on a destination to add it!'
                : 'No destinations found. Try another search or category!'}
            </p>
          )}
        </section>

        {/* ABOUT SECTION */}
        <section className="about" id="about">
          <span className="section-tag">
            ✦ OUR STORY
          </span>

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

        <p>
          Discover India. Create unforgettable memories.
        </p>

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
              alt={selectedDestination.name}
            />

            <div className="modal-info">
              <span>
                {selectedDestination.country.toUpperCase()}
              </span>

              <h2 id="modal-title">
                {selectedDestination.name}
              </h2>

              <p>
                {selectedDestination.description}
              </p>

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