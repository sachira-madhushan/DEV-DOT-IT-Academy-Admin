import React, { useState ,} from 'react';
import './AddChapterModel.css'
import { axiosCourseInstance } from '../../axios/axiosCourse';
import LoadingScreen from '../Models/Loading';
import { useParams } from 'react-router-dom';
const AddChapterModel = ({ show, onClose }) => {
    if (!show) return null;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState('');
    const [loading,setLoading]=useState(false)
    const {id}=useParams();
    const addChapter = async () => {
        if (title == '' || description == ''||video=='') {

        } else {
            setLoading(true);
            try{
                const response = await axiosCourseInstance.post('/addchapter', {
                    c_id:id,
                    chap_title: title,
                    chap_description: description,
                    chap_video:video
                })
    
                if (response.status === 201) {
                    setLoading(false)
                    alert("New chapter Added!")
                    window.location.reload();
                } else {
                    setLoading(false)
                    alert("Error while adding new chapter!")
                }
            }catch(e){
                setLoading(false)
                alert("Error while adding new chapter!")
            }
        }
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button onClick={onClose} className='closeButton'><img src="./../../../src/assets/close.png" alt="" /></button>
                <h2>Add New Chapter</h2>
                <input type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
                <input type="text" placeholder='Video Link' onChange={(e) => setVideo(e.target.value)} />
                <button className='save' onClick={() => addChapter()}>Save</button>
                {
                    loading?
                        <LoadingScreen/>
                    :null
                }
            </div>
        </div>
    );
};

export default AddChapterModel;
