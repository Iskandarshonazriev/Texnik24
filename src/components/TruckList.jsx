import TruckCard from "./TruckCard";

export default function TruckList({ data }) {
  return (
    <div className="flex-1 grid grid-cols-3 gap-6 p-6 bg-gray-100">
      {data.map((item) => (
        <TruckCard key={item.id} item={item} />
      ))}
    </div>
  );
}