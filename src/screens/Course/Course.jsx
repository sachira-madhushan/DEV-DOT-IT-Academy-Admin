import CourseModel from "../Course Model/CourseModel"
import { useState, useEffect } from "react";
import './Course.css'
import { axiosCourseInstance } from "../../axios/axiosCourse";
function Course() {

    const [searchCoursename, setSearchCourseName] = useState('');
    const [searchInstructor, setSearchInstructor] = useState('');
    const [searchID, setSearchId] = useState('');
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

    const [showEditStudentModel, setshowEditStudentModel] = useState(false);
    useEffect(() => {
        axiosCourseInstance.get('/all')
            .then(response => {
                setCourses(response.data.course);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);


    const handleEdit = (id) => {
        //setUserID(id);
        //setshowEditStudentModel(true)

    };

    const handleEditCloseModel = () => {
        //setshowEditStudentModel(false)
    }
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        //setShowModal(true);
    };

    const handleCloseModal = () => {
        //setShowModal(false);
    };

    return (
        <>
            <h1>Course List</h1>
            <div className="course-top">
                <div className="searchBox">
                    <input type="text" placeholder="Search By Username" onChange={(e) => setSearchCourseName(e.target.value)} />
                    <input type="text" placeholder="Search By Email" onChange={(e) => setSearchInstructor(e.target.value)} />
                    <input type="text" placeholder="Search By ID" onChange={(e) => setSearchId(e.target.value)} />
                </div>
                <div className="addstudentbutton">
                    <button><img src="./../../../src/assets/add.png" alt="" onClick={handleOpenModal} />Add New Course</button>
                    {/* <AddStudentModel show={showModal} onClose={handleCloseModal}></AddStudentModel> */}
                </div>
            </div>
            <div className="courseContainer">
                <div className="courseList">
                    {
                        filteredCourses.length > 0 ?
                            filteredCourses.map(course => (
                                <CourseModel key={course.c_id} courseTitle={course.c_title} courseBanner={course.c_banner} courseInstructor={course.c_instructor} coursePrice={course.c_price} courseID={course.c_id} />

                            ))

                            :

                            courses.map(course => (

                                <CourseModel key={course.c_id} courseTitle={course.c_title} courseBanner={course.c_banner} courseInstructor={course.c_instructor} coursePrice={course.c_price} courseID={course.c_id} />

                            ))}
                </div>
            </div>
        </>
    )
}

export default Course