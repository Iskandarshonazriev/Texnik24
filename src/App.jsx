import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TruckList from "./components/TruckList";
import { HashRouter } from "react-router-dom";
export default function App() {
  const [category, setCategory] = useState("all");

 const data = [
  {
    id: 1,
    title: "Грузовик",
    type: "truck",
    price: "300 сом/час",
    location: "Душанбе",
    weight: "30 тонн",
    volume: "20 м³",
    img: "https://specavto.ru/upload/resize_cache/uf/53d/270_170_2/fjf2ongkwvq1rumly6fc1p6p7ul773ly.jpg",
  },
  {
    id: 2,
    title: "Самосвал",
    type: "dump",
    price: "500 сом/час",
    location: "Худжанд",
    weight: "25 тонн",
    volume: "18 м³",
    img: "https://uzst.ru/images/stories/contentimages/catalog/2844-69935.jpg",
  },
  {
    id: 3,
    title: "Кран",
    type: "crane",
    price: "600 сом/час",
    location: "Душанбе",
    weight: "10 тонн",
    volume: "-", // не нужен
    img: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Autojerab-AD30.jpg",
  },
  {
    id: 4,
    title: "Экскаватор",
    type: "excavator",
    price: "550 сом/час",
    location: "Бохтар",
    weight: "15 тонн",
    volume: "1.2 м³",
    img: "https://ru.kaioumachinery.com/uploads/201816199/320hp-crawler-bulldozer33380363939.jpg",
  },
   {
    id: 5,
    title: "Бульдозеры",
    type: "bulldozer]",
    price: "550 сом/час",
    location: "Бохтар",
    weight: "15 тонн",
    volume: "1.2 м³",
    img: "https://specavto.ru/upload/uf/894/98nrodk7pharw0yumvf0r1ff5h2ymjfw.jpg",
  },
];

  const filtered =
    category === "all"
      ? data
      : data.filter((item) => item.type === category);

  return (
    <div className="flex">
      <HashRouter>
  <App />
</HashRouter>
      <Sidebar category={category} setCategory={setCategory} />
      <TruckList data={filtered} />
    </div>
  );
} 