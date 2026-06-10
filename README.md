## Stack

ASP.NET Core Minimal API w C# for backend, PostgreSQL via Entity Framework Core for the database. React, TypeScript and Vite for the frontend (styling in vanilla CSS).

## Endpoints

GET / - health check, returns a greeting message  
GET /api/books - a list of all books  
POST /api/books - add a book  
GET /api/books/<id> - find a book by id  
PUT /api/books/<id> - update a book (correct a typo, add a rating, mark as read)  
DELETE /api/books/<id> - remove a particular book

## Book

id: int  
title: string  
author: string  
bookRead: boolean  
startDate: Date | null  
finishedDate: Date | null  
rating: int | null (min 1 max 10)
