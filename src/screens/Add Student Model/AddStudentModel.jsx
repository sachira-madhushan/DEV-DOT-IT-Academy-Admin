import React from 'react';
import './AddStudentModel.css'
const AddStudentModel = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button onClick={onClose} className='closeButton'><img src="./../../../src/assets/close.png"  alt="" /></button>
                <h2>Add Student</h2>
                <input type="text" placeholder='Username' />
                <input type="text" placeholder='Fullname' />
                <input type="date" placeholder='Birthday' />
                <input type="Phone" placeholder='Phone Number' />
                <input type="text" placeholder='Email' />
                <button className='save'>Save</button>
            </div>
        </div>
    );
};

export default AddStudentModel;
