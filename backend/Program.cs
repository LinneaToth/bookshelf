using backend.Models;
using Microsoft.EntityFrameworkCore;
using backend.Data;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<BookDb>(options => options.UseNpgsql(connectionString));

var books = new List<Book>();
builder.Services.AddSingleton(books);

var app = builder.Build();

app.MapGet("/", BookEndpoints.HomeEndpoint);

app.MapGet("/api/books", () =>
{
    return TypedResults.Ok(books);
});

app.MapGet("/api/books/{id}", BookEndpoints.GetBook);


app.MapPost("/api/books", (Book book) =>
{
    books.Add(book);
    return TypedResults.Created($"books/{book.Id}", book);
});

app.MapDelete("/api/books/{id}", (int id) =>
{
    var targetBook = books.SingleOrDefault(book => id == book.Id);

    if (targetBook is not null)
    {
        books.Remove(targetBook);
        return Results.NoContent();
    }
    return Results.NotFound();


});

// app.MapPatch("/api/books/{id}", (int id, Book book) => BookController.Edit(id, book));

app.Run();

