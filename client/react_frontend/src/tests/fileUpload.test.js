// FileUploadPage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileUploadPage from '../components/fileUpload';

describe('FileUploadPage Component', () => {
  it('renders without crashing', () => {
    render(<FileUploadPage />);
    expect(screen.getByText(/drag & drop some files here/i)).toBeInTheDocument();
  });

  it('adds files to the list when dropped', () => {
    const { getByText } = render(<FileUploadPage />);
    const dropzone = getByText(/drag & drop some files here/i);

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [{ name: 'test-file.pdf', type: 'application/pdf', size: 1024 }],
      },
    });

    expect(getByText('test-file.pdf')).toBeInTheDocument();
  });

  it('removes a file from the list when the "Remove" button is clicked', () => {
    const { getByText, queryByText } = render(<FileUploadPage />);
    const dropzone = getByText(/drag & drop some files here/i);

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [{ name: 'test-file.pdf', type: 'application/pdf', size: 1024 }],
      },
    });

    expect(getByText('test-file.pdf')).toBeInTheDocument();

    fireEvent.click(getByText('Remove'));

    expect(queryByText('test-file.pdf')).not.toBeInTheDocument();
  });
});
