# Bookshelf

A personal bookshelf application for keeping track of books.

The main purpose of this project is to get acquainted with C#. Coming from a TypeScript background with some Node experience, I chose ASP.NET Core Minimal API as a first touchdown since its syntax feels familiar from Express.

## Stack

- **Backend:** ASP.NET Core Minimal API (C#, .NET 10)
- **Database:** PostgreSQL via Entity Framework Core
- **Frontend:** React, TypeScript and Vite, styling with Tailwind

## Prerequisites

- [.NET SDK 10](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (with npm)
- [PostgreSQL](https://www.postgresql.org/download/) running locally on port 5432
- The EF Core CLI tool: `dotnet tool install --global dotnet-ef`

## API

| Method | Route             | Description                |
| ------ | ----------------- | -------------------------- |
| GET    | `/`               | Returns a greeting message |
| GET    | `/api/books`      | List all books             |
| POST   | `/api/books`      | Add a book                 |
| GET    | `/api/books/{id}` | Find a book by id          |
| PUT    | `/api/books/{id}` | Update a book              |
| DELETE | `/api/books/{id}` | Remove a book              |

### The Book model

| Field          | Type         |                        |
| -------------- | ------------ | ---------------------- |
| `id`           | int          | Assigned by the server |
| `title`        | string       | Required               |
| `author`       | string       | Required               |
| `bookRead`     | boolean      |                        |
| `startDate`    | Date or null |                        |
| `finishedDate` | Date or null |                        |
| `rating`       | int or null  | 1 to 10                |

## Try it out

### 1. Database

Create a PostgreSQL database named `bookshelf`, then create `backend/appsettings.Development.json` (it is gitignored, so each developer supplies their own):

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=bookshelf;Username=postgres;Password=<your-password>"
  }
}
```

Apply the migrations to create the schema:

```sh
cd backend
dotnet ef database update
```

### 2. Backend

```sh
cd backend
dotnet run
```

The API starts on `http://localhost:5193`.

### 3. Frontend

In a separate terminal:

```sh
cd frontend
npm install
npm run dev
```

Vite serves the app on `http://localhost:5173`. The frontend expects the backend on port 5193, so both need to be running.
