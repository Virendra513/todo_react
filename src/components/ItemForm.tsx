import { useState } from "react";
import axios from "axios";



interface Props {
  onItemCreated: () => void;
}

const ItemForm = ({ onItemCreated }: Props) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("https://to-do-app-teib.onrender.com/api/items", { name });
      setName("");
      onItemCreated();
    } catch (err) {
      alert("Failed to create item");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6 justify-center">
        <input
            type="text"
            placeholder="Enter task name"
            className="border border-gray-300 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
        />
        <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition duration-200"
        >
            Add Task
        </button>
    </form>
  );
};

export default ItemForm;
