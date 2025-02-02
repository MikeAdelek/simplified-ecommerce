
# E-commerce Platform

A simplified ecommerce platform built with Next.js, TypeScript, and Tailwind CSS. Features product listing, cart management, checkout process, and responsive design.

## Features

- Product listing with search functionality
- Shopping cart with local storage persistence
- Checkout process with form validation
- Responsive design for all devices
- Dark mode support
- Dynamic product search
- API integration with error handling

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ecommerce-platform
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application

## Project Structure

```
├── components/
│   ├── ProductCard.tsx    # Product display component
│   └── ui/               # UI components
├── pages/
│   ├── index.tsx         # Product listing page
│   └── checkout.tsx      # Checkout page
├── store/
│   └── CartContext.tsx   # Cart state management
└── types/
    └── index.ts         # TypeScript types
```

## Key Components

### ProductCard

Displays individual product information:

- Product image
- Title
- Price
- Add to cart button

### CartContext

Manages shopping cart functionality:

- Add/remove items
- Calculate total
- Persist cart data

### Checkout Form

Handles order completion:

- Shipping information
- Form validation
- Order confirmation

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- React Context API
- Local Storage

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run linting
```

### Type Checking

```bash
npm run type-check  # Run TypeScript compiler
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## API call

Create a `fetch api` in Ecommerce App :

```fetch
https://fakestoreapi.com
```

## Troubleshooting

Common issues and solutions:

1. Images not loading:
   - Check image paths
   - Verify Next.js Image component usage

2. API errors:
   - Confirm API endpoint is accessible
   - Check environment variables

3. Build errors:

   ```bash
   # Clean install dependencies
   npm clean-install
   
   # Remove .next folder and rebuild
   rm -rf .next
   npm run build
   ```

## License

This project is licensed under the MIT License.
