# 🌿 Wanderly – Travel Explorer

A responsive travel discovery website built with **React and JavaScript**, designed to help users explore beautiful destinations across India, discover places through search and category filters, and save their favourite destinations.

## 🔗 Project Links

- **Live Demo:** [Wanderly – Travel Explorer](https://rishikathallapally.github.io/travel-explorer/)
- **GitHub Repository:** [View Source Code](https://github.com/rishikathallapally/travel-explorer)

## 📌 Project Overview

Wanderly is a frontend travel exploration application featuring a curated collection of destinations across India. It provides an interactive browsing experience with destination search, category-based filtering, and a favourites feature.

The application focuses on responsive design, reusable React components, interactive user interfaces, and accessible navigation.

## ✨ Features

- **Destination Exploration:** Browse a collection of 8 popular destinations across India.
- **Search Functionality:** Search destinations by name or state.
- **Category Filtering:** Filter destinations by Beach, Nature, Culture, and Heritage.
- **Favourites:** Add or remove destinations from favourites.
- **Persistent Storage:** Save favourite destinations using browser localStorage.
- **Destination Details:** View additional information through an interactive modal.
- **Keyboard Accessibility:** Navigate interactive elements using the keyboard, close the modal with Escape, and move focus appropriately.
- **Responsive Layout:** Optimized layouts for mobile, tablet, and desktop screens.
- **Lazy Loading:** Improve image loading performance.
- **Empty States:** Display helpful messages when no destinations match the selected filters.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React | Building reusable UI components |
| JavaScript (ES6+) | Application logic and interactivity |
| HTML5 | Semantic page structure |
| CSS3 | Styling and responsive layouts |
| Vite | Development server and build tool |
| localStorage | Persistent favourites storage |
| Git & GitHub | Version control and source code management |
| GitHub Pages | Website deployment |

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [Git](https://git-scm.com/)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/rishikathallapally/travel-explorer.git
```

**2. Navigate to the project directory**

```bash
cd travel-explorer
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the local URL**

Open the URL displayed in your terminal, usually:

```text
http://localhost:5173/
```

## 📂 Project Structure

```text
travel-explorer/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## 📱 Responsive Design

Wanderly is designed to provide a consistent browsing experience across different screen sizes.

The layout was checked at the following viewport widths:

- 320px – Small mobile devices
- 375px – Standard mobile devices
- 768px – Tablets
- 1024px – Small desktops and laptops
- 1440px – Large desktop screens

## ♿ Accessibility

Accessibility considerations include:

- Semantic HTML elements.
- Keyboard-accessible interactive elements.
- Visible focus management.
- Accessible modal interactions.
- Escape key support for closing the modal.
- Reduced-motion preferences.
- Appropriate accessible labels for interactive controls.

## 📦 Build for Production

To create an optimized production build, run:

```bash
npm run build
```

To preview the production build locally, run:

```bash
npm run preview
```

## 🌐 Deployment

The application is deployed using **GitHub Pages**.

The project uses Vite's base path configuration and the `gh-pages` package for deployment.

To deploy the latest version, run:

```bash
npm run deploy
```

## 👩‍💻 Author

**Rishika Thallapally**

- GitHub: [@rishikathallapally](https://github.com/rishikathallapally)

---

⭐ If you find this project interesting, feel free to explore the live website and source code!
