import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Employee from './Employee';
import CreateEmployee from './CreateEmployee';
import EditEmployee from './EditEmployee';
import UploadFile from './UploadFile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Employee />} />
          <Route path="/uploadFile" element={<UploadFile />} />
          <Route path="/create" element={<CreateEmployee />} />
          <Route path="/update/:id" element={<EditEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
