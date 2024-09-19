import './CourseModel.css'
import { useNavigate } from 'react-router-dom';
function CourseModel({ courseTitle, coursePrice, courseInstructor, courseBanner,courseID }) {

    const navigator=useNavigate();

    return (
        <div className="course-card">
            <img className="course-banner" src={courseBanner} alt="Course Banner" />
            <div className="course-details">

                <h2 className="course-title">{courseTitle}</h2>
                <p className="course-price">ID:{courseID}</p>
                <p className="course-instructor">Instructor: {courseInstructor}</p>
                <p className="course-price">Price:{coursePrice} LKR</p>
                <button className="edit-button" onClick={()=>{
                    navigator('/course/edit/'+courseID)
                }}>
                    Edit
                </button>
            </div>
        </div>
    )
}

export default CourseModel