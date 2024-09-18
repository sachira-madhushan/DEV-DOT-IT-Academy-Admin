import { useState, useEffect } from "react";
import { axiosInstance } from "../../axios/axios";
import './Admins.css'
import AddAdminModel from "../Add Admin Model/AddAdminModel";
import EditAdminModel from "../Edit Admin Model/EditAdminModel";
function Admins() {
    const [admins, setAdmins] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [searchUsername, setSearchUsername] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [filteredAdmins, setFilteredAdmins] = useState([]);
    const [adminID, setAdminID] = useState();

    useEffect(() => {
        axiosInstance.get('/all')
            .then(response => {
                setAdmins(response.data.admins);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);


    useEffect(() => {

        const filterUsers = () => {
            let result = admins;

            if (searchId) {
                result = result.filter(user => user.a_id === parseInt(searchId));
            }

            if (searchUsername) {
                result = result.filter(user => user.a_username.includes(searchUsername.toLowerCase()));
            }

            if (searchEmail) {
                result = result.filter(user => user.a_email.includes(searchEmail.toLowerCase()));
            }

            setFilteredAdmins(result);
        };

        filterUsers();
    }, [searchId, searchUsername, searchEmail, admins]);


    const handleDelete = async(id) => {
        try {
            const result=await axiosInstance.delete('/'+id);
            if(result.status===200){
                alert("Admin with ID:"+id+" delete!")
                window.location.reload();
            }
        } catch (error) {
            alert("Error while deleting user!")
        }
        
    };

    const [showEditAdminModel, setShowEditAdminModel] = useState(false);

    const handleEdit = (id) => {
        setAdminID(id);
        setShowEditAdminModel(true)
        
    };

    const handleEditCloseModel=()=>{
        setShowEditAdminModel(false)
    }
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div>
                <h1>Admin List</h1>
                <div className="searchBox">
                    <input type="text" placeholder="Search By Username" onChange={(e)=>setSearchUsername(e.target.value)}/>
                    <input type="text" placeholder="Search By Email" onChange={(e)=>setSearchEmail(e.target.value)}/>
                    <input type="text" placeholder="Search By ID" onChange={(e)=>setSearchId(e.target.value)}/>
                </div>
                <div className="addstudentbutton">
                    <button><img src="./../../../src/assets/add.png" alt="" onClick={handleOpenModal} />Add Admin</button>
                    <AddAdminModel show={showModal} onClose={handleCloseModal}/>
                </div>
                <div className="tablecontent">
                    <table border="1" cellPadding="10" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            filteredAdmins.length>0?
                            filteredAdmins.map(user => (
                                <tr key={user.a_id}>
                                    <td>{user.a_id}</td>
                                    <td>{user.a_username}</td>
                                    <td>{user.a_email}</td>
                                    <td>
                                        <button onClick={() => handleEdit(user.a_id)}><img src="./../../../src/assets/edit.png" alt="" /></button>
                                        <EditAdminModel show={showEditAdminModel} onClose={handleEditCloseModel} id={adminID}/>
                                        <button onClick={() => handleDelete(user.a_id)}><img src="./../../../src/assets/delete.png" alt="" /></button>
                                    </td>
                                </tr>
                            ))

                            :
                            
                            admins.map(user => (
                                <tr key={user.a_id}>
                                    <td>{user.a_id}</td>
                                    <td>{user.a_username}</td>
                                    <td>{user.a_email}</td>
                                    <td>
                                        <button onClick={() => handleEdit(user.a_id)}><img src="./../../../src/assets/edit.png" alt="" /></button>
                                        <EditAdminModel show={showEditAdminModel} onClose={handleEditCloseModel} id={adminID}/>
                                        <button onClick={() => handleDelete(user.a_id)}><img src="./../../../src/assets/delete.png" alt="" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Admins