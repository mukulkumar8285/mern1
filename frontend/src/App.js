import logo from './logo.svg';
import  { BrowserRouter , Routes , Route }from 'react-router-dom'
import './App.css';
import Dashboard from './dashboard/userexpense';
import Login from './Auth/login';
import Signup from './Auth/signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
