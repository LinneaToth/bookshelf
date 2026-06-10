type Props = {
  onClick: () => void;
};

export default function AddBook({ onClick }: Props) {
  return (
    <section
      onClick={onClick}
      className=" bg-stone-100 m-6 text-center bg-teal dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
      ADD BOOK
    </section>
  );
}
