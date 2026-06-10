public static class BookEndpoints
{
    public static IResult HomeEndpoint()
    {
        return TypedResults.Ok(new { Message = "Hello from the Bookshelf API!" });
    }

}