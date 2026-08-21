# User Management Service - Frontend

A Next.js-based frontend application for managing users with authentication.

## Quick Start

### Prerequisites

- Node.js v20.9+
- npm v9+

### Installation

From the `frontend` directory, install the dependencies:
npm install

### Configuration

Create a `.env.local` file:

NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

Ensure the backend allows `http://localhost:3000` in its CORS configuration.

### Running

Development:

npm run dev

Production build:

npm run build
npm run start

Lint:

npm run lint

## Features

- User authentication with OTP verification
- Employee listing, search, filtering and pagination
- Employee creation and editing
- Employee activation and deactivation
- Material UI components
- Redux state management
- TypeScript support
