# Tech Hub Frontend

A modern, responsive React application for various text and image processing tools.

## Features

- **Remove Background** - Remove backgrounds from images using AI
- **Image to Text** - Extract text from images using OCR
- **Summarizer** - Condense long text into key points
- **Paraphrase** - Rephrase text with different wording
- **Grammar Fix** - Fix grammar and spelling errors
- **QR Code Generator** - Generate QR codes from text or URLs

## Tech Stack

- React 18+
- Vite
- React Icons
- Poppins Font
- Responsive CSS Grid

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```
VITE_API_URL=http://localhost:8000
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── pages/           # Feature pages
│   ├── utils/           # API utilities
│   ├── App.jsx          # Main app component
│   ├── App.css          # Global styles
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

## Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## API Integration

All API calls are centralized in `src/utils/api.js` for easy configuration and error handling.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
