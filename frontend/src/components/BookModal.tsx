type Props = {
  closeModal: () => void;
  content?: "add" | "edit";
  bookId?: number;
};

export default function BookModal({ closeModal, content = "add" }: Props) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const bookData = {
      title: formData.get("title"),
      author: formData.get("author") || undefined,
      bookRead: formData.get("book-read") === "true",
      startDate: formData.get("start-date") || undefined,
      finishedDate: formData.get("finished-date") || undefined,
      rating: formData.get("rating")
        ? Number(formData.get("rating"))
        : undefined,
    };

    const url = "http://localhost:5193/api/books";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error("Book was not saved");
      }

      closeModal();
    } catch (error) {
      console.error("Failed to submit:", error);
    }
  };
  return (
    <div
      id="book-modal"
      aria-hidden="true"
      className="absolute overflow-y-auto overflow-x-hidden z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-700/20 flex align-middle justify-center">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6 bg-white">
          <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
            <h3 className="text-lg font-medium text-heading">
              {" "}
              {content == "add" ? "ADD BOOK" : "UPDATE BOOK"}
            </h3>
            <button
              onClick={closeModal}
              type="button"
              className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center cursor-pointer"
              data-modal-hide="book-modal">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form action="#" onSubmit={handleSubmit} className="pt-4 md:pt-6">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block mb-2.5 text-sm font-medium text-heading">
                Book title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="The Adventurous Little Dustbunny"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="author"
                className="block mb-2.5 text-sm font-medium text-heading">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="Scrub Mommy"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="start-date"
                  className="block mb-2.5 text-sm font-medium text-heading">
                  Started reading
                </label>
                <input
                  type="date"
                  id="start-date"
                  name="start-date"
                  className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs"
                />
              </div>
              <div>
                <label
                  htmlFor="finished-date"
                  className="block mb-2.5 text-sm font-medium text-heading">
                  Finished reading
                </label>
                <input
                  type="date"
                  id="finished-date"
                  name="finished-date"
                  className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="rating"
                className="block mb-2.5 text-sm font-medium text-heading">
                Rating (1–10)
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="10"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="8"
              />
            </div>
            <div className="flex items-start my-6">
              <div className="flex items-center">
                <input
                  id="book-read"
                  name="book-read"
                  type="checkbox"
                  value="true"
                  className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                />
                <label
                  htmlFor="book-read"
                  className="ms-2 text-sm font-medium text-heading">
                  I have read this book!
                </label>
              </div>
            </div>
            <button className="bg-green-100 bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none w-full mb-3">
              {content == "add" ? "ADD BOOK" : "UPDATE BOOK"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
