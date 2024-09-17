import React, { useState, useEffect } from 'react';
import './EditStudentModel.css'
import { axiosUserInstance } from '../../axios/axiosUser';
import LoadingScreen from '../Models/Loading';
const EditStudentModel = ({ id, show, onClose }) => {
    if (!show) return null;
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState('');
    const [detailsLoaded,setDetailsLoaded]=useState(false);

    useEffect(() => {
        setLoading(true);
        axiosUserInstance.get('/' + id).then(response => {
            setUser(response.data.user)
            console.log(response.data.user);
            setLoading(false)
            const dateString = response.data.user.u_birthday;

            const date = new Date(dateString);

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;

            response.data.user.u_birthday=formattedDate;
            setDetailsLoaded(true);
            setUsername(response.data.user.u_username)
            setFullname(response.data.user.u_fullname)
            setBirthday(response.data.user.u_birthday)
            setPhone(response.data.user.u_phone)
            setEmail(response.data.user.u_email)
        }).catch(e => {
            alert("Error while getting user details!")
        })

    }, []);

    const editStudent = async () => {
        if (username == '' || fullname == '' || birthday == '' || phone == '' || email == '') {

        } else {
            setLoading(true);
            try {
                const response = await axiosUserInstance.put('/' + id, {
                    u_username: username,
                    u_fullname: fullname,
                    u_birthday: birthday,
                    u_phone: phone,
                    u_email: email
                })

                if (response.status === 200) {
                    setLoading(false)
                    alert("User updated!")
                    window.location.reload();
                } else {
                    setLoading(false)
                    alert("Error while editing user details!")
                }
            } catch (e) {
                setLoading(false)
                alert("Error while editing user details!")
            }
        }
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button onClick={onClose} className='closeButton'><img src="./../../../src/assets/close.png" alt="" /></button>
                <h2>Edit Student</h2>
                <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} />
                <input type="text" placeholder='Fullname' onChange={(e) => setFullname(e.target.value)} value={fullname} />
                <input type="date" placeholder='Birthday' onChange={(e) => setBirthday(e.target.value)} value={birthday} />
                <input type="Phone" placeholder='Phone Number' onChange={(e) => setPhone(e.target.value)} value={phone} />
                <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
                <button className='save' onClick={() => editStudent()}>Save</button>
                {
                    loading ?
                        <LoadingScreen />
                        : null
                }
            </div>
        </div>
    );
};

export default EditStudentModel;
