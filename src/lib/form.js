import React, { useState } from 'react';

import '../App.css';
function FormPage({ children }) {
  return (
    <div className="min-h-screen mx-auto flex items-center justify-center bg-gray-100">
      {children}
    </div>
  );
}
export default FormPage;
