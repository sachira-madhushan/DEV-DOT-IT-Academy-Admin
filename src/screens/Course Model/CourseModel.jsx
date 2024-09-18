import './CourseModel.css'

function CourseModel({ courseTitle, coursePrice, courseInstructor, courseBanner,courseID }) {
    return (
        <div className="course-card">
            <img className="course-banner" src={courseBanner} alt="Course Banner" />
            <div className="course-details">

                <h2 className="course-title">{courseTitle}</h2>
                <p className="course-price">ID:{courseID}</p>
                <p className="course-instructor">Instructor: {courseInstructor}</p>
                <p className="course-price">Price:{coursePrice} LKR</p>
                <button className="edit-button" onClick={()=>{}}>
                    Edit
                </button>
            </div>
        </div>
    )
}

export default CourseModel