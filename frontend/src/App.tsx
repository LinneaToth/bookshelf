import { useState, useEffect } from "react";
import { getAllBooks, deleteBook } from "./api/bookApi";
import type { Book } from "./types/types";
import BookCard from "./components/BookCard";
import AddBook from "./components/AddBook";
import BookModal from "./components/BookModal";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const dbBooks = await getAllBooks();
      setBooks(dbBooks);
      setIsLoading(false);
    };
    getData();
  }, [showModal]);

  const handleDelete = async (id: number) => {
    await deleteBook(id);
    setBooks((prev: Book[]) => prev.filter((b) => b.id !== id));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section>
      <header className="border-b border-zinc-200 dark:border-zinc-700 px-6 py-4">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Books
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Read em rate em stick em in a shelf
        </p>
      </header>
      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {books.map((book: Book) => (
            <BookCard
              book={book}
              onDelete={handleDelete}
              key={book.id + "bookCard"}
            />
          ))}
        </div>
      )}
      <AddBook onClick={() => setShowModal(true)} />
      {showModal && <BookModal closeModal={closeModal} />}
    </section>
  );
}

export default App;
