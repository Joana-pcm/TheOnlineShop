# The Online Store

A modern e-commerce application built with React Router v7 and Tailwind CSS. Browse products, view details, and manage a shopping cart with a responsive design that works seamlessly across all devices.

## Features

- **Product Listing**: Browse products with pagination (5-page window), filtering by category, and sorting options (latest, price low-to-high, price high-to-low)
- **Product Details**: View detailed product information with image gallery and add-to-cart functionality
- **Shopping Cart**: Manage cart items with quantity controls, item removal, and order summary
- **Responsive Design**: Mobile-first approach with optimized layouts for tablets and desktops
- **React Router v7**: Server-side data fetching with loaders and client-side state management

## Tech Stack

- **Frontend**: React 19, React Router 7
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite
- **Server**: Node.js (React Router Serve)
- **API**: DummyJSON (https://dummyjson.com)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the App

### Development Mode

Start the development server with hot module reloading:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

### Production Build

Build the app for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

The app will be available at `http://localhost:3000`

## Project Structure

```
app/
├── app.css              # Global styles and animations
├── root.tsx             # Root layout component
├── routes.ts            # Route definitions
└── routes/
    ├── _home.tsx                    # Product listing page
    ├── _home.products.$id.tsx       # Product detail page
    └── cart.tsx                     # Shopping cart page
```

## Key Features Explained

- **Pagination**: Displays 5-page window, capped at 100 products from the API
- **Mobile Categories Dropdown**: On small devices, categories appear as a styled dropdown matching the sort dropdown
- **Cart Management**: Uses localStorage (client-side) to persist cart data
- **Responsive Grid**: Products arrange in 1 column on mobile, 2 on tablet, 3 on desktop
- **Smooth Animations**: Dropdown transitions, hover effects, and scroll animations

## Type Checking

Verify TypeScript types:
```bash
npm run typecheck
```
