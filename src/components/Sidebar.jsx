const categories = [
  { name: "Все", value: "all" },
  { name: "Грузовики", value: "truck" },
  { name: "Самосвалы", value: "dump" },
  { name: "Краны", value: "crane" },
  { name: "Экскаваторы", value: "excavator" },
  { name: "Бульдозеры", value: "bulldozer" },
  { name: "Погрузчики", value: "loader" },
];

export default function Sidebar({ category, setCategory }) {
  return (
    <div className="w-64 h-screen bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Каталог</h2>

      <div className="flex flex-col gap-2">
        {categories.map((item) => (
          <button
            key={item.value}
            onClick={() => setCategory(item.value)}
            className={`text-left px-4 py-2 rounded transition ${
              category === item.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}