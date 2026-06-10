using Microsoft.EntityFrameworkCore; //ORM
using backend.Models; //Book
using backend.Data; //My DbContext (BookDb)
using backend.Services; //To gain access to service methods

var CorsOkay = "CorsOkay";

//Provides a place for configuration of the HTTP pipeline, routes and Dependency Injections
var builder = WebApplication.CreateBuilder(args);

//Add CORS to the DI container, is middleware and could be separated to it's own class to keep this file lighter
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: CorsOkay,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173")
      .AllowAnyMethod()
      .AllowAnyHeader();
                      });
});

//Tells EF Core the details of the DB connection. Grabs the info from backend/appsettings.Development.json at the moment. 
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

//Configure context to connect to DB 
builder.Services.AddDbContext<BookDb>(options => options.UseNpgsql(connectionString));

//Adds validation to the DI-container, based on models, for PUT and POST requests
builder.Services.AddValidation();

var app = builder.Build();
app.UseCors(CorsOkay);

//Only endpoint with logic currently separated into /Endpoints
app.MapGet("/", BookEndpoints.HomeEndpoint);

app.MapGet("/api/books", async (BookDb db) =>
{
    return TypedResults.Ok(await db.Books.ToListAsync());
});

app.MapGet("/api/books/{id}", async (int id, BookDb db) =>
{
    var book = await db.Books.FindAsync(id);
    if (book is null) return Results.NotFound();
    return TypedResults.Ok(book);
});

app.MapPut("/api/books/{id}", async (int id, BookDb db, Book updatedBook) =>
{
    var book = await db.Books.FindAsync(id);
    if (book is null) return Results.NotFound();

    //Run actual book and the updated dito through updating method
    BookServices.BookUpdater(book, updatedBook);

    await db.SaveChangesAsync();
    return TypedResults.Ok(book);
});

app.MapPost("/api/books", async (Book book, BookDb db) =>
{
    await db.Books.AddAsync(book);
    await db.SaveChangesAsync();
    return TypedResults.Created($"/api/books/{book.Id}", book);
});

app.MapDelete("/api/books/{id}", async (int id, BookDb db) =>
{
    var book = await db.Books.FindAsync(id);

    if (book is null)
    {
        return Results.NotFound(); //For some reason I couldn't use TypedResults here (got lambda expression errors on my two arguments), something to look into.
    }

    db.Books.Remove(book);
    await db.SaveChangesAsync();
    return TypedResults.NoContent();
});


//Starts Kestrel, the actual server
app.Run();

