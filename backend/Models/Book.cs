
namespace backend.Models;

public class Book
{    
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;  
    public string Author { get; set; } = string.Empty;  
    public bool Read { get; set; }
    public DateOnly? StartDate { get; set; }
    public DateOnly? FinishedDate { get; set; }
    public int? Rating { get; set; }

}

