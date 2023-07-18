import './App.css';
import { useEffect, useState } from 'react';
import Login from './components/login page/login';
import CreateAccount from './components/CreateAccount./createAccount';
import { Route,Routes } from 'react-router';


function App() {
  const [UserId, setUserId] = useState()
  return (
    <div className="bg-blue-50">
      <Routes>
        <Route path='/' element={<UserLogin setUserId={setUserId} />} />
        <Route path='/login/createAccount' element={<CreateAccountPage />} />
        <Route path='/users/userAccount/:id/*' element={<UserPage userId={UserId} />} />
      </Routes>
    </div>
  );
  return 
}


// function App() {
//   const [items, setItems] = useState([])
//   useEffect(()=> {
//     fetch(`http://localhost:8080/items`)
//     .then(res => res.json())
//     .then(data => {
//       console.log(data)
//       setItems(data)
//   })
//   .catch(error => {
//     console.log(error)
//   })
// },[])

//   return (
//     <div className="App">
//       <header className="App-header">
//         <ul>
//           {items.map((item, index) => (
//             <li>{item.item_name}</li>
//           ))}
//         </ul>
//       </header>
//     </div>
//   );
// }

export default App;
