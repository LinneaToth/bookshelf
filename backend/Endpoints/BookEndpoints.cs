
using Microsoft.AspNetCore.Http.HttpResults;
using backend.Models;

public static class BookEndpoints
{
    public static IResult HomeEndpoint()
    {
        return Results.Ok(new { Message = "Hello from the Bookshelf API!" });
    }

    public static Results<Ok<Book>, NotFound> GetBook(string id, List<Book> books)
    {
        int parsedId = -1;
        int.TryParse(id, out parsedId);
        var targetBook = books.SingleOrDefault(book => parsedId == book.Id);
        return targetBook is null ? TypedResults.NotFound() : TypedResults.Ok(targetBook);
    }

}