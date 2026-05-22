using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http.HttpResults;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

var books = new List<Book>();

app.MapGet("/", () =>
{
    return "Welcome to the bookshelf";
})
.WithName("Home");

app.MapGet("/api/books", () =>
{
    return TypedResults.Ok(books);
})
.WithName("GetAllBooks");

app.MapGet("/api/books/{id}", Results<Ok<Book>, NotFound> (int id) =>
{
    var targetBook = books.SingleOrDefault(book => id == book.Id);
    return targetBook is null ? TypedResults.NotFound() : TypedResults.Ok(targetBook);
})
.WithName("GetBookById");


app.MapPost("/api/books", (Book book) =>
{
    books.Add(book);
     return TypedResults.Created($"books/{book.Id}", book);
})
.WithName("PostBook");

app.Run();

public record Book(int Id, string Title, string Author, bool isRead, DateOnly? StartDate, DateOnly? FinishedDate, [Range (1,10)] int Rating);