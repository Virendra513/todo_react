import { useEffect, useState } from "react";
import axios from "axios";

interface Item {
  id: string;
  name: string;
}

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const fetchItems = async () => {
    try {
      const res = await axios.get<Item[]>("https://to-do-app-teib.onrender.com/api/items");
      setItems(res.data);
    } catch (err) {
      console.error("Failed to fetch items", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://to-do-app-teib.onrender.com/api/items/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Failed to delete item", err);
    }
  };

  const handleEdit = (item: Item) => {
    setEditingId(item.id);
    setEditName(item.name);
  };

  const handleUpdate = async (id: string) => {
    try {
      await axios.put(`https://to-do-app-teib.onrender.com/api/items/${id}`, { name: editName });
      setEditingId(null);
      fetchItems();
    } catch (err) {
      console.error("Failed to update item", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6">
    <h2 className="text-3xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Tasks</h2>
    <ul className="space-y-3">
        {items.map((item) => (
        <li
            key={item.id}
            className="flex justify-between items-center border border-gray-300 px-4 py-2 rounded shadow hover:shadow-lg transition duration-200"
        >
            {editingId === item.id ? (
            <>
                <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="border border-gray-300 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-green-400 flex-1"
                />
                <button
                onClick={() => handleUpdate(item.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded ml-2 transition duration-200"
                >
                Save
                </button>
            </>
            ) : (
            <>
                <span className="flex-1">{item.name}</span>
                <div className="flex gap-2">
                <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition duration-200"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
                >
                    Delete
                </button>
                </div>
            </>
            )}
        </li>
        ))}
    </ul>
    </div>
  );
};

export default ItemList;
