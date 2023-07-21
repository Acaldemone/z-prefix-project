import './App.css';
import {useState, createContext, useContext, } from 'react';
import Login from './components/login page/login';
import CreateAccount from './components/CreateAccount./createAccount';
import { Route, Routes } from 'react-router-dom';
import InventoyPage from './components/InventoryPage/InventoryPage';
import UserPage from './components/UsersPage/UsersPage';

export const UserContext = createContext();

function App() {
  const [user_id, setUserId] = useState(null);
  console.log(user_id)
  return (
    <div className='app'>
      <h1>Inventory Database</h1>
      <UserContext.Provider value={{ user_id, setUserId }}>
      <Routes>
        <Route path='/' element={<InventoyPage />} />
        <Route path='/Login' element={<Login setUserId={setUserId} />} />
        <Route path='/login/createAccount' element={<CreateAccount />} />
        <Route path='/users/:id' element={<UserPage user_id={user_id} />} />
      </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
