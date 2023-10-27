import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from "./Header";
import Login from "./Login"
import Signup from "./Signup"

function App() {
  return (
    <Routes>
      <Route  index element={<Header />} />
 <Route path='/header' index element={<Header />} />
 <Route path='/login' element={<Login />} />
 <Route path='/signup' element={<Signup />} />
    </Routes>
  );
}

export default App;
