import React, { useState } from 'react';
import './AddAdminModel.css'
import { axiosInstance } from '../../axios/axios';
import LoadingScreen from '../Models/Loading';
const AddAdminModel = ({ show, onClose }) => {
    if (!show) return null;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const registerAdmin = async () => {
        if (username == '' ||email == '') {

        } else {
            setLoading(true);
            try{
                const response = await axiosInstance.post('/register', {
                    a_username: username,
                    a_email: email,
                    a_password:password
                })
    
                if (response.status === 201) {
                    setLoading(false)
                    alert("New Admin Created!")
                    window.location.reload();
                } else {
                    setLoading(false)
                    alert("Error while registering new admin!")
                }
            }catch(e){
                setLoading(false)
                alert("Error while registering new admin!")
            }
        }
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button onClick={onClose} className='closeButton'><img src="./../../../src/assets/close.png" alt="" /></button>
                <h2>Add New Admin</h2>
                <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <button className='save' onClick={() => registerAdmin()}>Save</button>
                {
                    loading?
                        <LoadingScreen/>
                    :null
                }
            </div>
        </div>
    );
};

export default AddAdminModel;
