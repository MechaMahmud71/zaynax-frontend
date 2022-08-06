import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from '../../Utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const UserAuth = () => {
    const [formData, setFormData] = useState({
        phoneNo: "",
        password: ""
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async () => {
        try {
            const { data } = await axios.post(API_URL + "/user/sign-up", formData);
            // console.log(data)
            localStorage.setItem('token', data.token);
            navigate('/cart')
        } catch (error) {
            toast.error(error.response.data.error)
        }

    }
    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f9fafb",
        }}>
            <ToastContainer />
            <div style={{
                width: "300px",
                padding: "10px",
                background: "white",
                borderRadius: "5px"
            }}
            >
                <div className="form-group">
                    <label htmlFor="" className='form-label'>Phone Number</label>
                    <input type="text" name="phoneNo" onChange={handleChange} placeholder='Phone Number' className='form-control rounded' />
                </div>
                <div className="form-group my-1">
                    <label htmlFor="" className='form-label'>Password</label>
                    <input type="password" name="password" onChange={handleChange} placeholder='Password' className='form-control rounded' />
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <button className="btn rounded-pill mt-2" style={{
                        background: "yellow",
                        padding: "5px 40px"

                    }}
                        onClick={handleSubmit}
                    >Sign up</button>
                </div>
            </div>
        </div>
    )
}

export default UserAuth