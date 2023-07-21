import { useState } from "react";

export default function EditItem({ item, onEdit }) {
    const [item_name, setItemName] = useState(item.item_name);
    const [description, setDescription] = useState(item.description);
    const [quantity, setQuantity] = useState(item.quantity);

    const handleItemEdit =() => {
        const updatedItem = {
            item_name,
            description,
            quantity,
          };
          console.log(updatedItem)
          onEdit(item.id, updatedItem);
    }

    return (
        <div className="editItemContainer">
          <h2>Edit Item</h2>
          <div>
            <label htmlFor="item_name"> Item Name</label>
            <input
              id="item_name"
              value={item_name}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Item Name"
              type="text"
              required
            />
          </div>
          <div>
            <label htmlFor="description"> Description</label>
            <input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              type="text"
              required
            />
          </div>
          <div>
            <label htmlFor="quantity"> Quantity</label>
            <input
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
              type="number"
              required
            />
          </div>
          <button onClick={handleItemEdit}>Submit Changes</button>
        </div>
      );
    
}