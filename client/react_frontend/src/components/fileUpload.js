import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import '../fileUpload.css';




const FileUploadPage = (props) => {

   const token = props.token
  console.log(token)
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const maxFileSizeMB = 2; // Set your maximum file size limit in megabytes
  const allowedTypes = ['.ppt', '.pptx', '.pdf', '.doc', '.docx', '.xlsx'];

  const onDrop = (acceptedFiles) => {
    // Update the state with the newly uploaded files
     // Reset error and success messages if all checks passed

    setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
  };


  const handleRemove = (index) => {
    // Remove a file from the state based on its index
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
    setError("")
  };
 
  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Check each file type and size individually

      // If all checks passed, proceed with the submission
      const formData = new FormData();
      
      if (uploadedFiles.length === 0) {
        throw new Error('No files uploaded.');
      }

      // Append each file to the FormData object
      uploadedFiles.forEach((file, index) => {
        if (file.size > maxFileSizeMB * 1024 * 1024) {
          throw new Error(`File "${file.name}" exceeds the maximum size of ${maxFileSizeMB} MB.`);
        }
        // Check file type
        const fileExtension = `.${file.name.split('.').pop()}`;
        if (!allowedTypes.includes(fileExtension.toLowerCase())) {
          throw new Error(`File "${file.name}" has an unsupported file type.`);
        }
       formData.append(`file${index}`, file);
      });
      

      // Make the API call using axios with FormData
      const response = await axios.post('http://localhost:5000/upload',  formData, {headers: {
        Authorization: `Bearer ${token}`
      }});
      response.access_token && props.setToken(response.access_token)

       // Display success message using alert
      alert('Files uploaded successfully!');
      setError("")
      setUploadedFiles([]); // Clear the uploaded files state after successful upload

      console.log('API response:', response.data);
      
    } catch (error) {
      console.error(error);
      // Check if the error has a response with data
      if (error.message) {
        // Set the error state with the error message from the server
        setError(error.message || 'An error occurred while fetching results.');
      } else {
        // Set a generic error message for other types of errors
        setError('An error occurred while fetching results. Please try again.');
      }
    }finally {
      setLoading(false);
    }
  };
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.ppt, .pptx, .pdf, .doc, .docx, .xlsx, .xls' // Specify the accepted file types
  });

  return (
    <div className="file-upload-container">
      <section className="dropzone-section">
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p> Drag & drop some files here, or click to select files. Accepted file types: {allowedTypes.join(",")} </p> 
        </div>
      </section>
      <section className="uploaded-files-section">
        <h2>Uploaded Files</h2>
        <ul className="file-list">
          {uploadedFiles.map((file, index) => (
            <li key={index} className="file-item">
              <span>{file.name}</span>
              <button onClick={() => handleRemove(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Uploading...' : 'Submit'}
        </button>
        {error && <div className="error-message">{error}</div>}
      </section>
    </div>
  );
};

export default FileUploadPage;
