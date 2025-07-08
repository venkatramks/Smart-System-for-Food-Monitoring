// src/components/Common/ErrorMessage.tsx

import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div style={{ color: 'red', padding: '10px', border: '1px solid red' }}>
      Error: {message}
    </div>
  );
};

export default ErrorMessage;  // Export the component!