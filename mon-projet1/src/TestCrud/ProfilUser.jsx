import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    // Fetch the list of uploaded files when the component mounts
    fetchFileList();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data.message);
      fetchFileList();  // Refresh the file list after successful upload
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  const fetchFileList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/files');
      setFileList(response.data);
    } catch (error) {
      console.error('Error fetching file list:', error);
    }
  };

  const handleDelete = async (fileName) => {
    try {
      await axios.delete(`http://localhost:5000/files/${fileName}`);
      fetchFileList();  // Refresh the file list after successful deletion
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Error deleting file');
    }
  };

  return (
    <div>
      <h1>Upload File</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      <h2>Uploaded Files</h2>
      <ul>
        {fileList.map(file => (
          <li key={file}>
            {file} 
            <button onClick={() => handleDelete(file)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;
