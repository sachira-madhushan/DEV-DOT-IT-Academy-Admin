import { useState,useEffect } from "react";
import { axiosUserInstance } from "../../axios/axiosUser";
import './Students.css'
import AddStudentModel from "../Add Student Model/AddStudentModel";

function Students() {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        axiosUserInstance.get('/all')
            .then(response => {
                setUsers(response.data.users);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    const handleDelete = (id) => {
        setUsers(users.filter(user => user.u_id !== id));
    };

    const handleEdit = (id) => {
        alert(`Edit user with id: ${id}`);
        
    };

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
                <h1>User List</h1>
                <div className="searchBox">
                    <input type="text" placeholder="Search By Username"/>
                    <input type="text" placeholder="Search By Email"/>
                    <input type="text" placeholder="Search By ID"/>
                </div>
                <div className="addstudentbutton">
                    <button><img src="./../../../src/assets/add.png" alt="" onClick={handleOpenModal}/>Add Student</button>
                    <AddStudentModel show={showModal} onClose={handleCloseModal}></AddStudentModel>
                </div>
                <div className="tablecontent">
                <table border="1" cellPadding="10" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Full Name</th>
                            <th>Birthday</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.u_id}>
                                <td>{user.u_id}</td>
                                <td>{user.u_username}</td>
                                <td>{user.u_fullname}</td>
                                <td>{new Date(user.u_birthday).toLocaleDateString()}</td>
                                <td>{user.u_phone}</td>
                                <td>{user.u_email}</td>
                                <td>
                                    <button onClick={() => handleEdit(user.u_id)}><img src="./../../../src/assets/edit.png" alt="" /></button>
                                    <button onClick={() => handleDelete(user.u_id)}><img src="./../../../src/assets/delete.png" alt="" /></button>
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

export default Students