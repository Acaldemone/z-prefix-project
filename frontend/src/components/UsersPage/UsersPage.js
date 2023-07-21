import { useEffect, useState, useContext } from "react";
import EditItem from '../EditItem/EditItem.js'
import './UserPage.css'
import Cookies from "js-cookie";
import { Link ,useParams} from "react-router-dom";
import { UserContext } from "../../App.js";

function UserPage() {
  const { user_id } = useParams();
  // const { user_id } = useContext(UserContext);
  const [userItems, setUserItems] = useState([]);
  const [item_name, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [editItemId, setEditItemId] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(user_id);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(token);
    if (!token) {
      fetch(`http://localhost:8080/items?user_id=${user_id}`)
        .then((res) => res.json())
        .then((data) => setUserItems(data))
        .catch((error) => {
          console.log(userItems);
          console.log(error);
        });
    }
  }, [user_id]);

  const userItemSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      console.error("User is not logged in");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/users/${user_id}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_name, description, quantity, user_id }),
      });

      if (response.ok) {
        const newItem = await response.json();
        setUserItems((prevItems) => [...prevItems, newItem]);
        setItemName("");
        setDescription("");
        setQuantity(0);
      } else {
        console.log("Item creation failed");
      }
    } catch (err) {
      console.error('Failure to add item', err);
    }
  }

  const editItem = async (itemId, updatedItem) => {
    try {
      const response = await fetch(`http://localhost:8080/items/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem)
      });

      console.log(updatedItem);
      
      if (response.ok) {
        setUserItems(prevItems => prevItems.filter(item => item.id !== itemId));
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
        setUserItems(prevItems => prevItems.filter(item => item.id !== itemId));
      } else {
        console.log('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item', error);
    }
  };

  return (
    <div className="userItemsPageContainer">
      {isLoggedIn ? (<h2>Welcome, User {user_id}</h2>):(<h2>Please log in to view your items</h2> )}

      <div>
        <div>
          <Link to="/login">Login</Link>
          <p></p>
          <Link to="/login/createAccount">Create Account</Link>
          <p></p>
          <Link to={`/`}>Inventory</Link>
        </div>

        <form onSubmit={userItemSubmit}>
          <div>
            <label htmlFor="item_name">Item Name</label>
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
            <label htmlFor="description">Description</label>
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
            <label htmlFor="quantity">Quantity</label>
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
        <h1>My Items</h1>
        <ul>
          {userItems.filter((item) => item.user_id === user_id).map((item) => (
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

export default UserPage;