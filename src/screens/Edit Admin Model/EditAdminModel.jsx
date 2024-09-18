import React, { useState, useEffect } from 'react';
import './EditAdminModel.css'
import { axiosInstance } from '../../axios/axios';
import LoadingScreen from '../Models/Loading';
const EditAdminModel = ({ id, show, onClose }) => {
    if (!show) return null;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState('');
    const [detailsLoaded,setDetailsLoaded]=useState(false);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get('/' + id).then(response => {
            setUser(response.data.user)
            console.log(response.data.user);
            setLoading(false)

            setDetailsLoaded(true);
            setUsername(response.data.user.a_username)
            setEmail(response.data.user.a_email)
        }).catch(e => {
            alert("Error while getting admin details!")
        })

    }, []);

    const editAdmin = async () => {
        if (username == '' || email == '') {

        } else {
            setLoading(true);
            try {
                const response = await axiosInstance.put('/' + id, {
                    a_username: username,
                    a_email: email
                })

                if (response.status === 200) {
                    setLoading(false)
                    alert("Admin updated!")
                    window.location.reload();
                } else {
                    setLoading(false)
                    alert("Error while editing admin details!")
                }
            } catch (e) {
                setLoading(false)
                alert("Error while editing admin details!")
            }
        }
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button onClick={onClose} className='closeButton'><img src="./../../../src/assets/close.png" alt="" /></button>
                <h2>Edit Admin</h2>
                <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} />
                <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
                <button className='save' onClick={() => editAdmin()}>Save</button>
                {
                    loading ?
                        <LoadingScreen />
                        : null
                }
            </div>
        </div>
    );
};

export default EditAdminModel;
