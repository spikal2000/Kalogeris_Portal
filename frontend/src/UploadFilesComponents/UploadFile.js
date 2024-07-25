import React, { useState } from 'react';
import axios from '../axiosConfig';
import NavbarComponent from '../NavbarComponent';
import { useParams, useNavigate } from 'react-router-dom';
import './uf.css';

function UploadFile() {
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // New state for button disable

  let { branch, code } = useParams();
  const navigate = useNavigate();

  const onFileChange = event => {
    setFile(event.target.files[0]);
    setIsUploaded(false);
    setIsUploading(false); // Enable the button if file changes
  };

  const onFileUpload = () => {
    if (!file) {
      alert('Παρακαλώ επιλέξτε ένα αρχείο πρώτα!');
      return;
    }

    setIsUploading(true); // Disable the button immediately
    const formData = new FormData();
    formData.append("file", file);
    formData.append("branch", code);

    axios.post("/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log('Το αρχείο ανέβηκε επιτυχώς', response);
      setIsUploaded(true);
      setTimeout(() => {
        navigate('/uploadFileSelection');
      }, 3500);
    })
    .catch(error => {
      console.error('Σφάλμα κατά τη μεταφόρτωση αρχείου', error);
      setIsUploaded(false); // Ensure upload status is false on error
      setIsUploading(false); // Re-enable the button on error
    });
  };

  return (
    <>
      <NavbarComponent />
      <br />
      <br />
      <div className="upload-container">
        <h3 className="text-center mb-4">Ανέβασμα αρχείου για {branch}</h3>
        <div className="input-group mb-3">
          <input type="file" className="form-control" onChange={onFileChange} disabled={isUploading || isUploaded} />
          <button className="btn btn-primary" onClick={onFileUpload} disabled={isUploading || isUploaded}>
            Ανεβάστε!
          </button>
        </div>
        {isUploaded && <div className="alert alert-success mt-3">Το αρχείο ανέβηκε επιτυχώς!</div>}
      </div>
    </>
  );
}

export default UploadFile;
