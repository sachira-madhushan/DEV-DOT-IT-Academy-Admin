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
            console.log(`Enrolling student ${student.u_username} to course ${course.c_title}`);

            alert(`Successfully enrolled ${student.u_username} (${student.u_email}) to ${course.c_title} (${course.c_id})`);
        } else {
            alert('Please select both a course and a student.');
        }
    };

    return (
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
    );
}

export default Enrollment