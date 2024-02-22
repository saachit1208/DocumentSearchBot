// File: FileListPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../fileList.css'; // Import the CSS file

const FileListPage = (props) => {
  const token = props.token
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch the list of files when the component mounts
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/files', {headers: {
        Authorization: `Bearer ${token}`
      }});
      response.access_token && props.setToken(response.access_token)
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleDelete = async (filename) => {
    // Ask for confirmation before deletion
    const confirmDeletion = window.confirm(`Are you sure you want to delete ${filename}?`);

    if (!confirmDeletion) {
      return; // Do nothing if the user cancels the deletion
    }

    try {
      // Optimistically remove the file from the state immediately
      setFiles((prevFiles) => prevFiles.filter((file) => file !== filename));

      // Send the delete request to the server
      await axios.post('http://localhost:5000/delete', { filename }, {headers: {
        Authorization: `Bearer ${token}`
      }});
    } catch (error) {
      console.error('Error deleting file:', error);
      // If there's an error, revert the state back to the original list
      fetchFiles();
    }
  };

  return (
    <div>
      <h2>File List</h2>

      {/* List of Files as Table */}
      <table className="file-list-table">
        <thead>
          <tr>
            <th>Filename</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file}>
              <td>{file}</td>
              <td>
                <button onClick={() => handleDelete(file)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileListPage;
