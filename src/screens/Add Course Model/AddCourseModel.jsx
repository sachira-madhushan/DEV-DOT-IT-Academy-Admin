import React, { useState } from 'react';
import './AddCourseModel.css'
import { axiosCourseInstance } from '../../axios/axiosCourse';
import LoadingScreen from '../Models/Loading';

const AddCourseModel = ({ show, onClose }) => {
    if (!show) return null;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [instructor, setInstructor] = useState('');
    const [banner, setBanner] = useState('');
    const [intro, setIntro] = useState('');
    const [loading,setLoading]=useState(false)

    const addCourse = async () => {
        if (title == '' || description == '' || price == '' || instructor == '' || banner == '' || intro=='') {

        } else {
            setLoading(true);
            try{
                const response = await axiosCourseInstance.post('/add', {
                    c_title: title,
                    c_description: description,
                    c_price: price,
                    c_instructor: instructor,
                    c_banner: banner,
                    c_intro:intro
                })
    
                if (response.status === 201) {
                    setLoading(false)
                    alert("New Course Added!")
                    window.location.reload();
                } else {
                    setLoading(false)
                    alert("Error while adding new course!")
                }
            }catch(e){
                setLoading(false)
                alert("Error while adding new course!")
            }
        }
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button onClick={onClose} className='closeButton'><img src="./../../../src/assets/close.png" alt="" /></button>
                <h2>Add New Course</h2>
                <input type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
                <input type="numbers" placeholder='Price' onChange={(e) => setPrice(e.target.value)} />
                <input type="text" placeholder='Instructor' onChange={(e) => setInstructor(e.target.value)} />
                <input type="text" placeholder='Banner Link' onChange={(e) => setBanner(e.target.value)} />
                <input type="text" placeholder='Intro Link' onChange={(e) => setIntro(e.target.value)} />
                <button className='save' onClick={() => addCourse()}>Save</button>
                {
                    loading?
                        <LoadingScreen/>
                    :null
                }
            </div>
        </div>
    );
};

export default AddCourseModel;
