## Stack

ASP.NET Core Minimal API w C# for backend, DB tbd. Vanilla React, Tailwind, TS for frontend.

## Endpoints

GET /books - a list of all books  
POST /books - add a book  
GET /books/<id> - find a book by id  
PUT /books/<id> - update a book (correct a typo, add a rating, mark as read)  
DELETE /books/<id> - remove a particular book

## Book

id: int
title: string  
author: string  
isRead: boolean
startDate: Date | null
finishedDate: Date | null
rating: int (min 1 max 10)
