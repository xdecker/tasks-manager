# Task Manager – Fullstack & Mobile Demo

## Project Overview

This repository contains a small full-stack system for managing personal tasks.
The project includes a backend API, a web client, and a mobile application that all interact with the same backend.

The goal of this implementation is to demonstrate a clean architecture, good developer practices, and practical engineering decisions within the time constraints of the assignment.

Users can:

* Sign up
* Sign in
* Create tasks
* View their tasks
* Update task status
* Filter tasks by status
* Use both the web and mobile apps with the same backend

---

## Repository Structure

backend/
  NestJS API, Prisma schema, migrations, tests

web/
  Next.js application for the browser client

tasks-mobile/
  React Native (Expo) mobile application

docker-compose.yml
  Local development environment

---

## Tech Stack

### Backend

* Node.js
* NestJS
* PostgreSQL
* Prisma ORM
* JWT Authentication
* Jest + Supertest for testing

### Web

* Next.js
* React
* TypeScript
* Tailwind / component based UI

### Mobile

* React Native
* Expo
* TypeScript
* Axios for API communication

### Infrastructure

* Docker
* Docker Compose

---

## Architecture Notes

The project is organized as a multi-app repository:

```
task-manager
  backend
  web
  tasks-mobile
  docker-compose.yml
```

Each application is isolated but communicates with the backend API.

### Backend

The backend follows a modular structure inspired by NestJS best practices:

* Auth module (JWT authentication)
* Tasks module
* Prisma integration layer
* DTO validation
* Basic error handling

### Database

PostgreSQL is used with Prisma ORM.
Database schema and migrations are managed through Prisma.

### Web

The web app uses modern React patterns and a component-based structure with feature separation (auth, tasks).

### Mobile

The mobile application uses Expo and follows a simple feature-based structure:

* auth
* tasks
    - Filter tasks by status (TODO, IN_PROGRESS, DONE)
    - Sort tasks ascending or descending by creation date
    - Pull-to-refresh and infinite scroll in mobile
* shared components
* API layer

Both the web and mobile apps communicate with the same backend API.

---

## Demo User

A demo user is created during the seed process.

Email:
demo@example.com

Password:
Password123

---

## Environment Variables

Each service includes a `.env.template` file.

Create a `.env` file based on it before running the project.

Example backend variables:

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/task_manager
JWT_SECRET=your_secret_key
```

Example web variables:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Example mobile variables:

```bash
EXPO_PUBLIC_API_URL=http://localhost:3000
```

---

## Running the Project with Docker

The easiest way to run the system is using Docker.

Requirements:

* Docker
* Docker Compose

Steps:

1. Clone the repository

```bash
git clone <https://github.com/xdecker/tasks-manager.git>
cd task-manager
```

2. Start all services

```bash
docker compose up --build
```

This will start:

Backend API:
http://localhost:3000

Web application:
http://localhost:3001

PostgreSQL database:
localhost:5435

### Database Migrations and Seed

When the backend container starts it automatically runs:

* database migrations
* seed script

The seed script creates the demo user and example tasks.

---

## Running the Project Locally (Without Docker)

### 1. Backend

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` from `.env.template`.

Run database migrations:

```bash
npx prisma migrate deploy
```

Run the seed script:

```bash
npx prisma db seed
```

Start the backend:

```bash
npm run start:dev
```

The API will be available at:

http://localhost:3000

---

### 2. Web Application

Navigate to the web folder:

```bash
cd web
```

Install dependencies:

```bash
npm install
```

Create `.env.local` from `.env.template`.

Start the development server:

```bash
npm run dev
```

The web app will run at:

http://localhost:3001

---

### 3. Mobile Application

Navigate to the mobile folder:

```bash
cd tasks-mobile
```

Install dependencies:

```bash
npm install
```

Create `.env` from `.env.template`.

Start the Expo server:

```bash
npx expo start
```

You can then run the app on:

* iOS Simulator
* Android Emulator
* Expo Go on a physical device

Make sure the `EXPO_PUBLIC_API_URL` points to the backend API.

---

## API Endpoints

Authentication
POST /auth/signup
POST /auth/login

Tasks

GET /tasks
POST /tasks
PATCH /tasks/:id
DELETE /tasks/:id

Each task includes:

* id
* title
* description
* status (todo, in_progress, done)
* createdAt
* updatedAt

---

## Running Tests

Backend tests are implemented using Jest and Supertest.

Run tests from the backend folder:

```bash
npm test
npm test:e2e
```

The tests cover basic scenarios such as:

* authentication flow
* task creation
* task update

---

## Assumptions and Tradeoffs

Due to the time constraint (4–5 hours), some decisions were intentionally simplified:

* Authentication is minimal and does not include password reset or user management.
* Only one demo user is seeded.
* Mobile and web share the same backend but have independent state management.
* Error handling and validation are basic but structured.
* Styling prioritizes usability and clarity over visual polish.

The focus was placed on:

* clear architecture
* working full-stack integration
* maintainable structure

---

## Possible Future Improvements

If more time were available, the following improvements could be implemented:

Authentication improvements

* forgot password
* password reset
* change password
* refresh tokens

Task features

* due dates
* reminders and notifications
* task priorities
* task search

Backend improvements

* GraphQL API in addition to REST
* Redis caching layer
* improved logging and monitoring
* stronger validation and error handling

Web improvements

* React Query for data fetching
* additional UI states and UX improvements
* testing

Mobile improvements

* additional testing using React Native Testing Library
* offline support
* push notifications for reminders

Infrastructure

* CI/CD pipeline
* container optimization
* environment based configuration

---

## AI Usage Disclosure

AI tools such as ChatGPT and GitHub Copilot were used during development.

They were mainly used for:
- generating boilerplate structures
- reviewing some implementation approaches
- refining Docker configuration and documentation

All generated code was manually reviewed and adjusted to ensure correctness, maintainability, and consistency with the project's architecture.

---

## Final Notes

- This app demonstrates full-stack capabilities, including authentication, CRUD operations, state management, API communication, mobile gestures, and responsive design.
- Toasts, modals, and swipeable components improve UX feedback on mobile.
- Sorting, filtering, and pagination are consistent with web behavior.
