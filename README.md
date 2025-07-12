# WishPool Frontend

![Stars](https://img.shields.io/github/stars/nais2sian/wishpool-frontend?style=social) ![License](https://img.shields.io/badge/license-CC--BY--4.0-lightgrey) ![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)

> React-based user interface for the WishPool gift-exchange service.

---

## Table of Contents

* [About](#about)
* [Requirements](#requirements)
* [Installation](#installation)
* [Available Scripts](#available-scripts)
* [Environment Variables](#environment-variables)
* [Development](#development)
* [Production Build](#production-build)
* [Testing](#testing)
* [Contributing](#contributing)
* [License and Credits](#license-and-credits)

---

## About

WishPool lets users create wish lists, exchange gifts, and track order status. This repository contains the client-side application built with **React** and **Create React App**.

## Requirements

* Node.js 18 or newer
* npm (or yarn / pnpm)

## Installation

```bash
git clone https://github.com/nais2sian/wishpool-frontend.git
cd wishpool-frontend
npm install
```

## Available Scripts

```bash
npm start        # launch development server with hot reload
npm run build    # create optimized production build in /build
npm test         # run unit tests with React Testing Library
npm run eject    # eject CRA configuration (irreversible)
```

## Environment Variables

Create a `.env` file in the project root to override defaults:

```
REACT_APP_API_URL=https://api.example.com
```

## Development

```bash
npm start
```

Open `http://localhost:3000` in your browser. The page reloads automatically whenever you edit files.

## Production Build

```bash
npm run build
```

Build artifacts are stored in the `build/` directory. Deploy these files to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

## Testing

```bash
npm test
```

Runs unit tests in watch mode.

## Contributing

1. Fork the repository or create a feature branch from `main`.
2. Implement your changes and add tests.
3. Open a pull request and describe what you have done.

## License and Credits

This project is based on the original **kupipodariday-frontend** code by **yandex-praktikum** and is distributed under the [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0).

See the `LICENSE` file for the full license text.

Changes made by [nais2sian](https://github.com/nais2sian).



