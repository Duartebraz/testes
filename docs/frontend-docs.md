# Frontend Documentation

## Overview

The frontend is a Next.js application that provides a visual dashboard for the GeniusFinance system. It allows users to view their financial data, transactions, and insights through an intuitive web interface.

## Architecture

The frontend is built with:

- **Next.js**: React framework for server-side rendering and routing
- **React**: UI component library
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: Component library based on Radix UI
- **Recharts**: Charting library for data visualization

## Setup and Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd GeniusFinance/front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3005
   ```

### Running the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Production mode
npm run start
```

## Project Structure

```
front/
├── app/                    # Next.js app router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── dashboard/          # Dashboard pages
│   ├── transactions/       # Transaction pages
│   └── settings/           # Settings pages
├── components/             # Reusable UI components
│   ├── ui/                 # UI components from shadcn/ui
│   ├── charts/             # Chart components
│   ├── dashboard/          # Dashboard-specific components
│   └── layout/             # Layout components
├── lib/                    # Utility functions and types
├── public/                 # Static assets
└── package.json            # Dependencies and scripts
```

## Key Components

### Dashboard Page

The main dashboard displays:
- Current balance
- Expense by category
- Recent transactions
- Financial insights

### Transactions Page

Lists all financial transactions with:
- Filtering by date, category, and type
- Sorting options
- Search functionality
- Transaction details view

### Settings Page

Allows users to:
- Update profile information
- Manage notification preferences
- Configure display options

## State Management

The frontend uses React's built-in state management with:
- `useState` for component-level state
- `useContext` for sharing state between components
- React Query for API data fetching and caching

## Data Visualization

Charts and graphs are created using Recharts:

- Pie charts for expense categories
- Line charts for balance over time
- Bar charts for monthly expenses

## API Integration

The frontend communicates with the backend using a custom API client:

```typescript
// Example API client
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getBalance = async (userId: string) => {
  const response = await api.get(`/chat/saldo?userId=${userId}`);
  return response.data;
};

export const getCategories = async (userId: string) => {
  const response = await api.get(`/chat/categorias?userId=${userId}`);
  return response.data;
};

// More API methods...
```

## Authentication

User authentication is handled through:
1. Phone number verification (via WhatsApp)
2. Session management with secure HTTP-only cookies
3. Protected routes requiring authentication

## Responsive Design

The frontend is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile devices

This is achieved through:
- Tailwind CSS responsive classes
- Fluid layouts
- Mobile-first design approach

## Accessibility

The application follows accessibility best practices:
- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Color contrast compliance
- Screen reader support

## Error Handling

The frontend implements comprehensive error handling:
- API error handling with user-friendly messages
- Fallback UI for failed components
- Loading states for asynchronous operations
- Form validation with helpful error messages

## Deployment

The Next.js application can be deployed to:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Custom hosting

### Deployment to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## Performance Optimization

The frontend is optimized for performance through:
- Server-side rendering (SSR)
- Static site generation (SSG) where appropriate
- Image optimization
- Code splitting
- Bundle size optimization
- Caching strategies
