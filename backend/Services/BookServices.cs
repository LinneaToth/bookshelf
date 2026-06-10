using backend.Models; //Book
namespace backend.Services; //Add the class & method to the backend namespace

public class BookServices
{
    public static void BookUpdater(Book storedBook, Book editedBook)
    {
        storedBook.Title = editedBook.Title ?? storedBook.Title;
        storedBook.Author = editedBook.Author ?? storedBook.Author;
        storedBook.BookRead = editedBook.BookRead;
        storedBook.StartDate = editedBook.StartDate ?? storedBook.StartDate;
        storedBook.FinishedDate = editedBook.FinishedDate ?? storedBook.FinishedDate;
        storedBook.Rating = editedBook.Rating ?? storedBook.Rating;

        //BookUpdater keeps track of the referenced bookobject and mutates it. No return needed. 
    }
}