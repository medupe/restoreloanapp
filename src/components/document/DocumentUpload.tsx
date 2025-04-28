// src/components/document/DocumentUpload.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import './DocumentUpload.css'; // We'll create this CSS file next

// --- Interface based on your JSON structure (API Response/Data Model) ---
interface UploadedDocument {
  id: number;
  user_id: number;
  loan_id: number | null; // Allow null if not always tied to a loan initially
  document_name: string;
  file_name: string; // Usually set by the backend based on the uploaded file
  file_path: string; // Usually set by the backend
  file_size: number; // Usually set by the backend
  status: 'pending' | 'approved' | 'rejected' | string; // Refine statuses if known
  upload_date: string; // Or Date
  remarks: string | null; // Allow null
}

// --- Interface for API Error Response ---
interface ApiErrorResponse {
  message: string;
  // Add other potential error fields if your API returns them
}

// --- Component Props ---
interface DocumentUploadProps {
  userId: number; // The ID of the user uploading the document
  loanId?: number | null; // Optional: The ID of the loan this document relates to
  onUploadSuccess: (uploadedDocument: UploadedDocument) => void; // Callback on successful upload
  onCancel?: () => void; // Optional callback for cancellation
}

// --- React Component ---
const DocumentUpload: React.FC<DocumentUploadProps> = ({
  userId,
  loanId = null, // Default to null if not provided
  onUploadSuccess,
  onCancel,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // --- Handle File Selection ---
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null); // Clear previous errors on new file selection
    setSuccessMessage(null);
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Optionally pre-fill document name based on file name (without extension)
      const nameWithoutExtension = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      setDocumentName(nameWithoutExtension);
    } else {
      setSelectedFile(null);
      setDocumentName('');
    }
  };

  // --- Handle Form Submission ---
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }
    if (!documentName.trim()) {
      setError('Please provide a name for the document.');
      return;
    }

    setIsLoading(true);

    // --- Prepare FormData for File Upload ---
    // FormData is necessary for sending files via HTTP request
    const formData = new FormData();
    formData.append('file', selectedFile); // 'file' is the key the backend expects for the file data
    formData.append('userId', String(userId)); // Send user ID
    if (loanId !== null) {
      formData.append('loanId', String(loanId)); // Send loan ID if available
    }
    formData.append('documentName', documentName); // Send custom document name
    formData.append('remarks', remarks); // Send remarks

    // --- API Call ---
    // IMPORTANT: Replace with your actual API endpoint for document uploads
    const apiUrl = 'https://restoreloans-apis.onrender.com/api/documents/upload'; // <-- EXAMPLE ENDPOINT - CHANGE THIS

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData, // Send FormData
        // **DO NOT** set 'Content-Type': 'multipart/form-data' manually with fetch + FormData.
        // The browser will set it correctly, including the boundary.
        headers: {
          'Accept': 'application/json',
          // Add Authorization header if needed, e.g.:
          // 'Authorization': `Bearer ${your_auth_token}`,
        },
      });

      if (!response.ok) {
        let errorMessage = `Upload failed: ${response.status} ${response.statusText}`;
        try {
          const errorData: ApiErrorResponse = await response.json();
          if (errorData?.message) {
            errorMessage = errorData.message;
          }
        } catch (jsonError) {
          console.error("Failed to parse error response JSON:", jsonError);
        }
        throw new Error(errorMessage);
      }

      // Assuming the API returns the details of the uploaded document on success
      const uploadedDocument: UploadedDocument = await response.json();

      setSuccessMessage(`Document "${uploadedDocument.document_name}" uploaded successfully!`);
      onUploadSuccess(uploadedDocument); // Notify parent component

      // Reset form after successful upload
      setSelectedFile(null);
      setDocumentName('');
      setRemarks('');
      // Clear the file input visually (requires a trick or using its 'key' prop)
      // A common way is to reset the form element itself if you have a ref,
      // or manage the input's value (though file inputs are tricky).
      // Easiest might be to conditionally render the form or change its key.

    } catch (err: any) {
      console.error("Error uploading document:", err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred during upload.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- Handle Cancel ---
  const handleCancel = () => {
    // Reset state
    setSelectedFile(null);
    setDocumentName('');
    setRemarks('');
    setError(null);
    setSuccessMessage(null);
    // Call the optional onCancel prop from the parent
    if (onCancel) {
      onCancel();
    }
  };


  return (
    <div className="document-upload-container">
      <h3>Upload Document</h3>
      <form onSubmit={handleSubmit} className="document-upload-form">
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {/* Document Name Input */}
        <div className="form-group">
          <label htmlFor="documentName">Document Name:</label>
          <input
            type="text"
            id="documentName"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            required
            disabled={isLoading}
            placeholder="e.g., Payslip March 2024, ID Document"
          />
        </div>

        {/* File Input */}
        <div className="form-group">
          <label htmlFor="fileUpload">Select File:</label>
          {/* Use a key derived from selectedFile to force re-render on reset */}
          <input
            key={selectedFile ? selectedFile.name : 'file-input'}
            type="file"
            id="fileUpload"
            onChange={handleFileChange}
            required
            disabled={isLoading}
            // Consider adding 'accept' attribute for specific file types
            // accept=".pdf,.jpg,.jpeg,.png"
          />
          {selectedFile && (
            <span className="selected-file-name">Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
          )}
        </div>

        {/* Remarks Input */}
        <div className="form-group">
          <label htmlFor="remarks">Remarks (Optional):</label>
          <textarea
            id="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            disabled={isLoading}
            rows={3}
            placeholder="Add any relevant notes here..."
          />
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="submit" className="upload-button" disabled={isLoading || !selectedFile}>
            {isLoading ? 'Uploading...' : 'Upload Document'}
          </button>
          {/* Show cancel button if onCancel prop is provided */}
          {onCancel && (
             <button type="button" className="cancel-button" onClick={handleCancel} disabled={isLoading}>
               Cancel
             </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DocumentUpload;
