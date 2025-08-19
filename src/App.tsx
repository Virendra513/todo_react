import './App.css'

import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

function App() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">TO-DO List</h1>
      <ItemForm onItemCreated={() => window.location.reload()} />
      <ItemList />
    </div>
  );
}

export default App;
