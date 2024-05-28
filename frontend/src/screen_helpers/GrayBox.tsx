import React from 'react';

const GrayBox = ({ text, onClose }) => {
  return (
    <div className="gray-box">
      <p>{text}</p>
      <button onClick={onClose}>&times;</button>
    </div>
  );
};

export default GrayBox;
