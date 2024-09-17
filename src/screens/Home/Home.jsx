import './Home.css'
import { axiosInstance } from '../../axios/axiosAuth'
import { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import Students from '../Student/Students';
import { axiosUserInstance } from '../../axios/axiosUser';

function Home() {
    const [userName, setUsername] = useState('');
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await axiosInstance.get("/",)
                setUsername(response.data.a_username);
            } catch (e) {
                console.log("error");
            }


        }
        fetchAdmin();
    }, []);

    useEffect(() => {
        const fetchUserCount=async()=>{
            try {
                const response = await axiosUserInstance.get("/count",)
                setUserCount(response.data.count[0].numOfUsers)
            } catch (e) {
                console.log("error");
            }
        }
        fetchUserCount()
    }, []);


    return (
        <>
            <div className="top">
                <div className="logo">
                    <h4>DEV DOT Academy</h4>
                </div>
                <div className="topright">
                    <h3>Welcome ,{userName}</h3>
                </div>
            </div>
            <div className="body">
                <div className="menu">
                    <br />
                    <div className="buttons selectedButton"><img src="./../../../src/assets/student.png" alt="" /><Link id='link' to={'/students'}>Manage Students</Link><br /></div>
                    <div className="buttons"><img src="./../../../src/assets/course.png" alt="" /><Link id='link'>Manage Courses</Link><br /></div>
                    <div className="buttons"><img src="./../../../src/assets/enrollment.png" alt="" /><Link id='link'>Manage Enrollments</Link><br /></div>
                    <div className="buttons"><img src="./../../../src/assets/admin.png" alt="" /><Link id='link'>Manage Admins</Link><br /></div>
                    <div className="box">
                    <img src="./../../../src/assets/graduating-student.png" alt="" />
                        <h5>Total Students</h5>
                        <h6>{userCount}</h6>
                    </div>
                    <div className="box">
                    <img src="./../../../src/assets/online-learning.png" alt="" />
                        <h5>Total Courses</h5>
                        <h6>1</h6>
                    </div>
                </div>
                <div className="content">

                    <Routes>
                        <Route path='/students' element={<Students />} />
                    </Routes>

                </div>
            </div>
        </>
    )
}


export default Home