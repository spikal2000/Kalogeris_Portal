import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import UploadFile from './UploadFilesComponents/UploadFile';
import UploadFileSelection from './UploadFilesComponents/UploadFileSelection';
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
          <Route path="/uploadFile/:branch/:code" element={<UploadFile />} />
          <Route path="/uploadFileSelection" element={<UploadFileSelection />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
