import React, { useState } from 'react';
import axios from 'axios';
import NavbarComponent from '../NavbarComponent';
import { useParams } from 'react-router-dom';


function UploadFile() {
  const [file, setFile] = useState(null);
  
  let { branch, code } = useParams();
  
  const onFileChange = event => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("branch", code);

    axios.post("http://localhost:8081/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => console.log('File uploaded successfully', response))
    .catch(error => console.error('Error uploading file', error));
  };

  return (
    
    <div>
      <NavbarComponent />
      <h1>Upload File for {branch} with code {code}</h1>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>
        Upload!
      </button>
    </div>
  );
}

export default UploadFile;
