import './Enrollment.css'
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { axiosUserInstance } from '../../axios/axiosUser';
import { axiosCourseInstance } from '../../axios/axiosCourse';


function Enrollment() {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [courses, setcourses] = useState([]);
    const [students, setstudents] = useState([]);
    const [enrollments, setenrollments] = useState([]);

    useEffect(() => {
        axiosCourseInstance.get('/enrollments')
            .then(response => {
                setenrollments(response.data.enrollments);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);


    useEffect(() => {
        axiosUserInstance.get('/all')
            .then(response => {
                setstudents(response.data.users);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    useEffect(() => {
        axiosCourseInstance.get('/all')
            .then(response => {
                setcourses(response.data.course);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    const courseOptions = courses.map(course => ({
        value: course.c_id,
        label: course.c_title
    }));

    const studentOptions = students.map(student => ({
        value: student.u_id,
        label: `${student.u_username} \n(${student.u_email})`
    }));

    const handleEnroll = () => {
        if (selectedCourse && selectedStudent) {
            const course = courses.find(c => c.c_id === selectedCourse.value);
            const student = students.find(s => s.u_id === selectedStudent.value);
            
            try{
                const response=axiosCourseInstance.post("/asign",{
                    c_id:course.c_id,
                    u_id:student.u_id
                })
                alert(`Successfully enrolled ${student.u_username} to ${course.c_title}`);
                window.location.reload();

            }catch(e){
                alert("Error while enrolling!");
            }

            
        } else {
            alert('Please select both a course and a student!');
        }
    };

    const handleDelete = async(id) => {
        try {
            const result=await axiosCourseInstance.delete('/enrollments/'+id);
            if(result.status===200){
                alert("Enrollment with ID:"+id+" delete!")
                window.location.reload();
            }
        } catch (error) {
            alert("Error while deleting enrollment!")
        }
        
    };

    return (
        <>
            <div className='addSection'>
                <div className='searchInput'>
                    <label>Select Course</label>
                    <Select
                        options={courseOptions}
                        onChange={setSelectedCourse}
                        value={selectedCourse}
                        placeholder="Search and select course"
                    />
                </div>

                <div className='searchInput'>
                    <label>Select Student</label>
                    <Select
                        options={studentOptions}
                        onChange={setSelectedStudent}
                        value={selectedStudent}
                        placeholder="Search and select student"
                    />
                </div>

                <button
                    className='enrollButton'
                    onClick={handleEnroll}
                >
                    Enroll
                </button>
            </div>
            <div className="tablecontent">
                <table border="1" cellPadding="10" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Enrollment ID</th>
                            <th>Course ID</th>
                            <th>Student ID</th>
                            <th>Registered Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                                enrollments.map(enrollment => (
                                    <tr key={enrollment.e_id}>
                                        <td>{enrollment.e_id}</td>
                                        <td>{enrollment.c_id}</td>
                                        <td>{enrollment.u_id}</td>
                                        <td>{enrollment.e_date}</td>
                                        <td>
                                            <button onClick={() => handleDelete(enrollment.e_id)}><img src="./../../../src/assets/delete.png" alt="" /></button>
                                        </td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Enrollment