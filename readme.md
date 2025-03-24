# Memora: A Note-Taking Application

## Overview

This application is built using **ReactJS** (frontend), **ExpressJS** (backend), **TypeORM** (ORM), and **PostgreSQL** (database). The app allows users perform CRUD operations for their notes and categories.

## Deployment

- Hosted on Netlify at [https://memora-notes.netlify.app](https://memora-notes.netlify.app)
- The app may experience a 50-seconds delay on the first start due to the backend server being hosted on Render's free-tier service.

## Features

- **JWT Authentication**: Secure authentication using JSON Web Tokens (JWT).
- **CRUD for Notes and Categories**: Create, Read, Update, and Delete operations for both notes and categories.
- **Search Functionality**: Search notes by title and content.
- **User-Specific Notes and Categories**: Each user has their own separate notes and categories.
- **Pagination**: Efficient pagination support for listing notes and categories.

## Setup Instructions

### Prerequisites

- **Node.js**
- **PostgreSQL**
- **npm**

To run the application locally, you need to set up the following:

### Clone the repository

```
git clone git@github.com:SarjyantShrestha/Memora.git
```

### Frontend Setup

### 1. Navigate to Frontend folder

```
cd Frontend/
```

1. Create a `.env` file :

`Frontend/.env:`

```
VITE_BASE_URL=http://localhost:8000/api/v1
```

### 2. Install packages

```
npm i
```

### 3. Run server

```
npm run dev
```

### Backend Setup

### 1. Navigate to Backend folder

```
cd Backend/
```

1. Create a `.env` file :

`Backend/.env:`

```
PORT=8000
ORIGIN_URL=http://localhost:5173
DB_URL=
JWT_REFRESH_SECRET=
JWT_SECRET=
```

Setup your own account for SMTP, create google app password: [Google App Password](https://myaccount.google.com/apppasswords?rapt=AEjHL4OAsnC5LkBSZqV6ZRY8qBFHaXn_0GVSoGDvcyeE4sTZOlHurrohu2CLxDJ_u4_JhaJlBJJhSPwpN5jijM_p-xoK89gypR0r2O7sOzSjv6xWpgSn8t8)

```
EMAIL_PASS=
EMAIL_USER=
```

### 2. Install Packages

```
npm i
```

### 3. Run Server

```
npm run dev
```

### 4. API Documentation (Swagger)

You can access swagger docs at: `http://localhost:<PORT>/docs`

## Engineering Decisions

### 1. Tech Stack

For **Memora**, I chose a combination of technologies that balance performance, scalability, and developer experience. The major components of the tech stack include:

- **Frontend**: **ReactJS**
  - Chosen for its flexibility, ease of use, and ability to build responsive, interactive user interfaces. React’s component-based architecture makes it easy to manage the application’s UI in a modular and scalable way.
- **Backend**: **ExpressJS**
  - ExpressJS was selected for the backend because of its simplicity and minimalism. It provides the flexibility to handle requests and routes easily, while being lightweight enough to meet the requirements of the project.
- **Database**: **PostgreSQL**
  - PostgreSQL is a powerful, open-source relational database. It was chosen for its robustness, scalability, and support for advanced SQL features like full-text search and complex queries. It’s a great fit for this project, ensuring efficient data management and scalability.
- **ORM**: **TypeORM**
  - TypeORM was selected for its ease of use and compatibility with TypeScript. It provides an easy-to-manage interface for interacting with the PostgreSQL database and supports automatic migrations, reducing boilerplate code and speeding up development.

### 2. Authentication & Authorization

- **JWT-based Authentication**: Utilizes access tokens for secure user authentication and refresh tokens for maintaining session longevity without compromising security.
- **Authorization**: Access to notes is restricted to the note owner. This ensures that users can only modify their own data and prevents unauthorized access to sensitive information.

### 3. API Design

- **RESTful API**: The backend follows REST principles for consistency and simplicity. The API provides endpoints for CRUD operations on notes, as well as for user authentication and authorization.
- **Versioning**: Versioning is included in the API endpoint URL (`/api/v1`) to ensure backward compatibility as the application evolves.

### 4. Frontend Architecture

- **Responsive Design**: The frontend is designed to be a seamless user experience on both desktop and mobile devices.

- **Componentization**: A component-based architecture was adopted to encourage code reusability and maintainability, making it easier to scale the application as new features are added.

### 5. Deployment

- **Render**: For deployment, **Render.com** was chosen for hosting the backend netlify for frontend. Render's free-tier service is used for small-scale deployment, though it may result in a 50-second cold start on the first launch.
