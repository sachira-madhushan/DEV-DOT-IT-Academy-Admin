import CourseModel from "../Course Model/CourseModel"
import { useState } from "react";
import './Course.css'
function Course() {

    const [searchCoursename, setSearchCourseName] = useState('');
    const [searchInstructor, setSearchInstructor] = useState('');
    const [searchID, setSearchId] = useState('');

    const [showEditStudentModel, setshowEditStudentModel] = useState(false);

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
                    <CourseModel courseTitle="Game Development Sinahala Full Course" courseBanner="https://cdn.prod.website-files.com/5b651f8b5fc94c4e27470a81/622227fd2ce3cc0455a88166_blog-gamedev-fullsize.png" courseInstructor="J.P.Sachira Madhushan" coursePrice="2000" courseID={1} />
                    <CourseModel courseTitle="Game Development Sinahala Full Course" courseBanner="https://cdn.prod.website-files.com/5b651f8b5fc94c4e27470a81/622227fd2ce3cc0455a88166_blog-gamedev-fullsize.png" courseInstructor="J.P.Sachira Madhushan" coursePrice="2000" courseID={1} />
                    <CourseModel courseTitle="Game Development Sinahala Full Course" courseBanner="https://cdn.prod.website-files.com/5b651f8b5fc94c4e27470a81/622227fd2ce3cc0455a88166_blog-gamedev-fullsize.png" courseInstructor="J.P.Sachira Madhushan" coursePrice="2000" courseID={1} />
                    <CourseModel courseTitle="Game Development Sinahala Full Course" courseBanner="https://cdn.prod.website-files.com/5b651f8b5fc94c4e27470a81/622227fd2ce3cc0455a88166_blog-gamedev-fullsize.png" courseInstructor="J.P.Sachira Madhushan" coursePrice="2000" courseID={1} />

                </div>
            </div>
        </>
    )
}

export default Course