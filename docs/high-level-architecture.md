# GeniusFinance - Project Documentation

## Overview

GeniusFinance is a comprehensive financial assistant system that helps users manage their finances through a WhatsApp chatbot interface. The system consists of three main components:

1. **Backend (NestJS)**: Handles business logic, API endpoints, and database operations
2. **WhatsApp Bot**: Interfaces with users through WhatsApp and communicates with the backend
3. **Frontend (Next.js)**: Provides a web dashboard for visual representation of financial data

The system uses AI-powered chat to interpret and categorize financial transactions, track expenses, and provide financial insights to users.

## System Architecture

### High-Level Architecture

```
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│  WhatsApp Bot │◄───►│  NestJS API   │◄───►│  PostgreSQL   │
│  (Node.js)    │     │  (Backend)    │     │  Database     │
└───────────────┘     └───────┬───────┘     └───────────────┘
                             │
                             ▼
                      ┌───────────────┐
                      │  Next.js      │
                      │  Frontend     │
                      └───────────────┘
```

### Technologies Used

- **Backend**:
  - NestJS (TypeScript-based Node.js framework)
  - Prisma ORM
  - PostgreSQL
  - OpenAI API integration

- **WhatsApp Bot**:
  - Node.js
  - whatsapp-web.js
  - Axios for API communication

- **Frontend**:
  - Next.js
  - React
  - Tailwind CSS
  - Recharts for data visualization

## Repository Structure

```
GeniusFinance/
├── back/                  # NestJS Backend
│   ├── prisma/            # Prisma ORM schema and migrations
│   ├── src/               # Source code
│   │   ├── controllers/   # API endpoints
│   │   ├── modules/       # NestJS modules
│   │   ├── repositories/  # Repository pattern implementations
│   │   ├── services/      # Business logic
│   │   └── prisma/        # Prisma service and module
│   └── package.json       # Dependencies and scripts
├── bot/                   # WhatsApp Bot
│   ├── index.js           # Main bot entry point
│   ├── api.js             # API service for backend communication
│   └── package.json       # Dependencies and scripts
└── front/                 # Next.js Frontend
    ├── app/               # Next.js pages and components
    ├── components/        # Reusable UI components
    └── package.json       # Dependencies and scripts
```

## Getting Started

This documentation will guide you through setup, development, and deployment of the GeniusFinance project.

- [Backend Documentation](./backend-docs.md)
- [WhatsApp Bot Documentation](./bot-docs.md)
- [Frontend Documentation](./frontend-docs.md)
- [API Reference](./api-reference.md)
- [Database Schema](./database-schema.md)
