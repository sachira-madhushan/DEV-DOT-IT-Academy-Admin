import React from 'react';
import './AddStudentModel.css'
const AddStudentModel = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Modal Title</h2>
                <p>This is the modal content!</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
