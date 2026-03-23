import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express(); // 🔥 ВАЖНО

app.use(cors());
app.use(express.json());

const TOKEN = "8673776780:AAEXEIYdZgJl66vrfUyyr2iNOzS2zTx8ujQ";
const CHAT_ID = "7152972467";

// тест
app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});

app.post("/send-order", async (req, res) => {
  console.log("ЗАПРОС ПРИШЕЛ ✅");

  const { item, phone } = req.body;

 const text = `
🚚 Новая заявка!

👤 Клиент оставил заявку

📦 Техника: ${item.title}
💰 Цена: ${item.price}
📍 Город: ${item.location}
🚚 Вес: ${item.weight}

📞 Телефон: ${phone}

⏰ Срочно свяжитесь!
`;

  try {
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    chat_id: CHAT_ID,
    text
  })
});

    res.send({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Ошибка отправки" });
  }
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});



console.log("Отправляю в Telegram...");