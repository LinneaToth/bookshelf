using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Book
{
    public int Id { get; set; }
    public string Title { get; set; } = "No title added";
    public string Author { get; set; } = "No author added";
    public bool BookRead { get; set; } = false;
    public DateOnly? StartDate { get; set; }
    public DateOnly? FinishedDate { get; set; }

    [Range(1, 10)]
    public int? Rating { get; set; }
}