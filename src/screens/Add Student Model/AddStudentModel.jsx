import React, { useState } from 'react';
import './AddStudentModel.css'
import { axiosUserInstance } from '../../axios/axiosUser';
import LoadingScreen from '../Models/Loading';
const AddStudentModel = ({ show, onClose }) => {
    if (!show) return null;
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const registerStudent = async () => {
        if (username == '' || fullname == '' || birthday == '' || phone == '' || email == '') {

        } else {
            setLoading(true);
            try{
                const response = await axiosUserInstance.post('/register', {
                    u_username: username,
                    u_fullname: fullname,
                    u_birthday: birthday,
                    u_phone: phone,
                    u_email: email
                })
    
                if (response.status === 201) {
                    setLoading(false)
                    alert("New User Created!")
                    window.location.reload();
                } else {
                    setLoading(false)
                    alert("Error while registering new users!")
                }
            }catch(e){
                setLoading(false)
                alert("Error while registering new users!")
            }
        }
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button onClick={onClose} className='closeButton'><img src="./../../../src/assets/close.png" alt="" /></button>
                <h2>Add Student</h2>
                <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                <input type="text" placeholder='Fullname' onChange={(e) => setFullname(e.target.value)} />
                <input type="date" placeholder='Birthday' onChange={(e) => setBirthday(e.target.value)} />
                <input type="Phone" placeholder='Phone Number' onChange={(e) => setPhone(e.target.value)} />
                <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <button className='save' onClick={() => registerStudent()}>Save</button>
                {
                    loading?
                        <LoadingScreen/>
                    :null
                }
            </div>
        </div>
    );
};

export default AddStudentModel;
