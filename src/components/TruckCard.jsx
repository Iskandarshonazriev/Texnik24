import { useState } from "react";

export default function TruckCard({ item }) {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleOrder() {
    if (!phone) {
      alert("Введите номер!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item,
          phone,
        }),
      });

      if (!res.ok) {
        throw new Error("Ошибка сервера");
      }

      const data = await res.json();
      console.log(data);

      alert("✅ Заявка отправлена!");
      setOpen(false);
      setPhone("");

    } catch (error) {
      console.log(error);
      alert("❌ Ошибка отправки. Проверь сервер!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition">
        
        <div className="h-56 bg-gray-100 flex items-center justify-center">
          <img
            src={item.img}
            className="max-h-full object-contain"
          />
        </div>

        <div className="p-4">
          <h2 className="font-bold text-lg">{item.title}</h2>
          <p className="text-gray-600">{item.price}</p>
        </div>

        <div className="bg-gray-100 px-4 py-3 flex justify-between items-center text-sm border-t">
          <div>📍 {item.location}</div>
          <div className="border-l h-5"></div>
          <div>💰 {item.price}</div>
          <div className="border-l h-5"></div>
          <div>🚚 {item.weight}</div>

          {item.volume !== "-" && (
            <>
              <div className="border-l h-5"></div>
              <div>📦 {item.volume}</div>
            </>
          )}
        </div>

        <div className="p-4 flex justify-end">
          <button
            onClick={() => setOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Заказать
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          
          <div className="bg-white p-6 rounded-xl w-80 shadow-lg animate-fadeIn">
            
            <h2 className="text-lg font-bold mb-4">
              Заказ: {item.title}
            </h2>

            <input
              type="text"
              placeholder="+992..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-2 rounded mb-4 focus:outline-blue-500"
            />

            <div className="flex justify-end gap-2">
              
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Отмена
              </button>

              <button  onClick={handleOrder}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
              >
                {loading ? "Отправка..." : "Отправить"}
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}