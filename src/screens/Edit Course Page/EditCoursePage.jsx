import './EditCoursePage.css'
import { axiosCourseInstance } from '../../axios/axiosCourse';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
function EditCoursePage() {
    const [data, setData] = useState({});
    const [course, setCourse] = useState({});
    const [chapters, setChapters] = useState([]);
    const { id } = useParams();
    
    function convertToEmbedLink(shareLink) {
        if(shareLink==null){

        }else{
            if (shareLink.includes("youtu.be")) {
                const cleanLink = shareLink.split('?')[0];
                const videoId = cleanLink.split('/').pop();
                shareLink =`https://www.youtube.com/embed/${videoId}`;
    
            }
        }
        
        return shareLink;
    }

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axiosCourseInstance.get(`/course/${id}`);
                const fetchedData = response.data;
                
                setData(fetchedData);
                setCourse(fetchedData.course[0]);
                setChapters(fetchedData.chapters);
            } catch (error) {
                console.error("Error fetching course data: ", error);
            }
        };

        fetchCourseData();
    }, [id]);
    return (
        <>
            <div className="app">
                <div className="container">
                    <div className="course-intro">
                        <iframe
                            width="100%"
                            height="315"
                            src={convertToEmbedLink(course.c_intro)}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <main className="main-content">
                        <section className="course-info">
                            <h2>{course.c_title}</h2>
                            <p className="description">{course.c_description}</p>
                            <div className="instructor">
                                <h3>Instructor: {course.c_instructor}</h3>
                                <h3>Price: Rs{course.c_price}</h3>
                            </div>
                        </section>
                    </main>
                    <button className='addchapter'>Add Chapter</button>
                    <button className='deletecourse'>Delete Course</button>
                </div>

                <div className="chapters-list">
                    {chapters.map((chapter, index) => (
                        <div key={index} className="chapter">
                            <h4>{chapter.chap_title}</h4>
                            <p>{chapter.chap_description}</p>
                            <iframe
                                width="100%"
                                height="180"
                                src={convertToEmbedLink(chapter.chap_video)}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default EditCoursePage;
