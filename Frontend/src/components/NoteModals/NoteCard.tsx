interface CardProps {
  title: string;
  content: string;
  date: string;
  category: string[];
  onClick: () => void;
}

const NoteCard = ({ title, content, date, category, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white shadow-md rounded-md border border-gray-300 p-4 cursor-pointer hover:shadow-lg transition"
    >
      {/* Title */}
      <h3 className="text-lg font-semibold">{title}</h3>
      <hr className="my-2 border-gray-300" />

      {/* Content */}
      <p className="text-gray-700 text-sm line-clamp-8 min-h-[160px]">
        {content}
      </p>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mt-3">
        {category.map((cat, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Date */}
      <p className="text-xs text-gray-500 mt-3">{date}</p>
    </div>
  );
};

export default NoteCard;
