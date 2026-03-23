import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

app.use(cors());
app.use(express.json());

const TOKEN = "8673776780:AAFRTgknbzjURWREjMycMjjEUwDpF5rIopg";
const CHAT_ID = "7152972467";

app.post("/send-order", async (req, res) => {
  const { item, phone } = req.body;

  const text = `
🚜 Новый заказ!
📦 ${item.title}
💰 ${item.price}
📍 ${item.location}
📞 ${phone}
  `;

  try {
    const tg = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
        }),
      }
    );

    const data = await tg.json();
    console.log("Telegram:", data);

    res.json({ success: true });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ошибка Telegram" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server работает на http://localhost:3000");
});