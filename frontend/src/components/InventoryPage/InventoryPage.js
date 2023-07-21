import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import './InventoryPage.css'
import EditItem from '../EditItem/EditItem.js'

export default function InventoyPage() {
    const [items, setItems] = useState([]);
    const [user_id, setUserId] = useState('');  
    const [item_name, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [editItemId, setEditItemId] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/items`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setItems(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const itemSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item_name, description, quantity }),
            });

            console.log(response);

            if (response.ok) {
                const newItem = response.json();
                setItems(prevItems => [...prevItems, newItem]);
                setItemName('');
                setDescription('');
                setQuantity(0);
            } else {
                console.log('Item creation failed');
            }
        } catch (error) {
            console.error('Failed to add item', error);
        }
    }

    const editItem = async (itemId, updatedItem) => {
        try {
            const response = await fetch(`http://localhost:8080/items/${itemId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItem),
            });

            console.log(updatedItem);

            if (response.ok) {
                setItems(prevItems => prevItems.filter(item => item.id !== itemId));
            } else {
                console.log('Failed to edit item');
            }
        } catch (error) {
            console.error('Error editing item', error);
        }
    };

    const deleteItem = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:8080/items/${itemId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                setItems(prevItems => prevItems.filter(item => item.id !== itemId));
            } else {
                console.log('Failed to delete item');
            }
        } catch (error) {
            console.error('Error deleting item', error);
        }
    };

    return (
        <div className="inventoryPageContainer">
            <div>
                <Link to="/login">Login</Link>
                <p></p>
                <Link to="/login/createAccount">Create Account</Link>
                <p></p>
                <Link to={`/users/${user_id}`}>Your Inventory</Link>
            </div>
            <div>
                <form onSubmit={itemSubmit}>
                    <div>
                        <label htmlFor="item_name" value="Item Name"> Item Name</label>
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
                        <label htmlFor="description" value="Description"> Description </label>
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
                        <label htmlFor="quantity" value="Quantity">Quantity</label>
                        <input
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Quantity"
                            type="number"
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <header className="App-header">
                <h1>Inventory</h1>
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            <p>ITEM: {item.item_name}</p>
                            <p>DESCRIPTION: {item.description}</p>
                            <p>QUANTITY: {item.quantity}</p>
                            <button onClick={() => deleteItem(item.id)}>delete</button>
                            <button onClick={() => setEditItemId(item.id)}>edit</button>
                            {editItemId === item.id && (
                                <EditItem item={item} onEdit={editItem} />
                            )}
                        </li>
                    ))}
                </ul>
            </header>
        </div>
    );
}
