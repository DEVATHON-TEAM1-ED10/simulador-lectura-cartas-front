# 🔮 Tarot Reading Simulator - Frontend

An interactive and mystical web application where users can perform tarot readings by selecting three cards and receiving personalized predictions based on their choices.

---

## 📋 Main Contents

- [Description](#-description)
- [Main Features](#-main-features)
- [Requirements](#-requirements)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [Contributions](#-contributions)
- [License](#-license)

---

## 📖 Descripción

**Tarot Reading Simulator** is a modern web application that offers an immersive tarot reading experience. Users can:

- Explore a 22-card deck of the Major Arcana
- Select 3 cards with 3D flipping animations
- Receive personalized predictions based on the chosen card combination
- Enjoy a mystical-themed interface with captivating visual effects

The project is designed as an MVP (Minimum Viable Product) with no authentication system, allowing any visitor to perform readings instantly.

---

## ✨ Main Features

### 🃏 **Interactive Card System**

- 12 random cards displayed per session
- Flip effect when selecting
- Maximum of 3 selectable cards
- Immediate visual feedback (borders, shadows, animations)

### 🔮 **Smart Predictions**

- Prediction system based on thematic combinations
- Personalized messages based on the chosen cards
- Defined positions: Past, Present, and Future
- Oracle advice tailored to each reading

### 🎨 **Premium Visual Experience**

- Mystical gradient design
- Fluid animations
- Animated background effects
- 100% responsive (mobile-first)

### ⚡ **Optimized Performance**

- Ultra-fast build with Vite
- Lazy loading of components
- Optimized CSS with Tailwind
- Minimum bundle size

---

## 📦 Requirements

Antes de comenzar, asegúrate de tener instalado:

- [NODE.JS v24.10.0](https://nodejs.org/es/download/current)
- [PNPM v10.15.1](https://pnpm.io/es/installation)
- [GIT](https://git-scm.com/downloads/win)

### Verificar versiones instaladas:

```bash
node --version
pnpm --version
git --version
```

---

## 🚀 Installation

### 1. Clone this repository to your local machine:

```bash
git clone https://github.com/DEVATHON-TEAM1-ED10/card-reading-simulator-front

```

### 2. Navigate to the project directory:

```bash
cd card-reading-simulator
```

### 3. Install necessary dependencies:

```bash
pnpm install
```

---

## 🏃 Running the Project

Start the project:

```bash
pnpm run dev
```

The application will be available at: **http://localhost:5173/**

---

## 📁 Project Structure

```
├── public/
│   └── cards/              // Still images of cards (optional)
├── src/
│   ├── assets/             // Resources optimized by Vite
│   ├── components/
│   │   ├── layout/         // Global structure components
│   │   ├── cards/          // Everything related to tarot cards
│   │   ├── reading/        // Components for the reading process and results
│   │   └── common/         // Reusable components throughout the app
│   ├── services/           // Communication logic with the backend
│   ├── hooks/              // Custom hooks for reusable logic
│   ├── utils/              // Auxiliary functions, constants, and helpers
│   ├── data/               // Mock data y datos estáticos (tarotDeck.js)
│   ├── styles/             // Static data and mock data for development
│   ├── App.jsx             // Principal Component
│   └── main.jsx            // Entry point
```

---

## 🛠️ Technologies Used

- **Rect** - Main library for frontend development.
- **TypeScript** - Programming language used.
- **HTML5** and **CSS3** - Structure and styling for the application.
- **TailwindCSS** - Utility-first CSS framework for rapidly building custom user interfaces.
- **Zustand** - State management
- **Axios** - HTTP client requests

---

## 🚀 Deployment

- NOT YET SPECIFIED

## 🙏 Acknowledgments

- Design inspired by the mystical aesthetics of traditional tarot
- Icons by [Lucide Icons](https://lucide.dev/)
- Fonts by [Google Fonts](https://fonts.google.com/)

---

## Contributions

Contributions are welcome! Please follow the steps below to contribute:

    1. Fork the repository.
    2. Create a new branch for your changes (`git checkout -b feature/new-feature`).
    3. Make your modifications.
    4. Write commit messages following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard:
        - **feat**: A new feature
        - **fix**: A bug fix
        - **docs**: Documentation only changes
        - **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
        - **refactor**: Code change that neither fixes a bug nor adds a feature
        - **test**: Adding missing tests or correcting existing tests
        - **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation
    5. Push your changes (`git push origin feature/new-feature`).
    6. Open a Pull Request for your changes to be reviewed.

### Example Commit Message

```plaintext
feat: add new reading feature based on cards selected
```

## 📄 License

This project is licensed under the MIT License - see the file [LICENSE](https://github.com/DEVATHON-TEAM1-ED10/simulador-lectura-cartas-front/blob/main/LICENSE.md) para más detalles.

---
