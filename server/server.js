import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const TOKEN = "8673776780:AAFRTgknbzjURWREjMycMjjEUwDpF5rIopg";
const CHAT_ID = "7152972467";

app.post("/send-order", async (req, res) => {
  try {
    console.log("📥 BODY:", req.body);

    const item = req.body.item || {};
    const phone = req.body.phone || "Не указан";

    const title = item.title || req.body.title || "Без названия";
    const price = item.price || req.body.price || "Без цены";

    const text = `
📦 Новый заказ!

🚜 Техника: ${title}
💰 Цена: ${price}
📞 Телефон: ${phone}
`;

    const tgRes = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
      }),
    });

    const tgData = await tgRes.json();
    console.log("📤 TELEGRAM:", tgData);

    res.json({ success: true });

  } catch (error) {
    console.log("❌ SERVER ERROR:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});