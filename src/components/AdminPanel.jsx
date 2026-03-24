import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [trucks, setTrucks] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  async function getData() {
    let res = await fetch("http://localhost:3001/trucks");
    let data = await res.json();
    setTrucks(data);
  }

  useEffect(() => {
    getData();
  }, []);

  async function addTruck() {
    await fetch("http://localhost:3001/trucks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });
    getData();
  }

  async function deleteTruck(id) {
    await fetch(`http://localhost:3001/trucks/${id}`, {
      method: "DELETE",
    });
    getData();
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Админ панель</h1>

      <input
        placeholder="Название"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        placeholder="Цена"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 mr-2"
      />

      <button onClick={addTruck} className="bg-green-500 text-white px-4 py-2">
        Добавить
      </button>

      <div className="mt-6">
        {trucks.map((t) => (
          <div key={t.id} className="flex justify-between mb-2">
            <span>{t.name} - {t.price}</span>
            <button
              onClick={() => deleteTruck(t.id)}
              className="bg-red-500 text-white px-2"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}