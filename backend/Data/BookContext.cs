using Microsoft.EntityFrameworkCore;
using backend.Models;


namespace backend.Data;

public class BookDb : DbContext
{
    public BookDb(DbContextOptions<BookDb> options) : base(options) { }
    public DbSet<Book> Books { get; set; } = null!;
}