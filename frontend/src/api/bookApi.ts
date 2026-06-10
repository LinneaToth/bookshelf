const host = "http://localhost:5193/api";

export const getAllBooks = async () => {
  const response = await fetch(`${host}/books`);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const deleteBook = async (id: number) => {
  const response = await fetch(`${host}/books/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
};
