import type { Book } from "../types/types";

type Props = {
  book: Book;
  onDelete: (id: number) => void;
};

export default function BookCard({ book, onDelete }: Props) {
  let stars;
  if (book.rating) {
    stars = Array.from({ length: 10 }, (_, i) =>
      i < book.rating ? "★" : "☆",
    ).join("");
  }

  return (
    <article className="bg-white  border border-zinc-200  rounded-xl p-5 text-left shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0">
          <p className="font-semibold text-stone-900 ">{book.title}</p>
          <p className="text-sm text-stone-500">{book.author}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              book.bookRead
                ? "bg-emerald-100 text-emerald-700 "
                : "bg-stone-100 text-stone-500"
            }`}>
            {book.bookRead ? "Read" : "Unread"}
          </span>
          <button
            onClick={() => onDelete(book.id)}
            className="text-zinc-400 hover:text-red-500  transition-colors duration-150 cursor-pointer"
            aria-label="Delete book">
            ✕
          </button>
        </div>
      </div>

      {stars && (
        <p className="text-amber-400 mt-3 text-base leading-none tracking-wider">
          {stars}
        </p>
      )}
    </article>
  );
}
