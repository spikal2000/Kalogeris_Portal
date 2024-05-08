import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import UploadFile from './UploadFile';
import HomePage from './HomePage';
import AddUser from './admin/AddUser';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/uploadFile" element={<UploadFile />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
