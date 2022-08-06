import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from '../../Utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AdminAuth = () => {
    const [formData, setFormData] = useState({
        credential: "",
        password: ""
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async () => {
        try {
            const { data } = await axios.post(API_URL + "/admin/login", formData);
            console.log(data)
            localStorage.setItem('adminToken', data.token);
            navigate('/admin-products')
        } catch (error) {
            toast.error(error.error)
        }

    }
    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "#f9fafb",
        }}>
            <ToastContainer />
            <h3>Admin Panel</h3>
            <div style={{
                width: "300px",
                padding: "10px",
                background: "white",
                borderRadius: "5px"
            }}
            >
                <div className="form-group">
                    <label htmlFor="" className='form-label'>User ID</label>
                    <input type="text" name="credential" onChange={handleChange} placeholder='Phone Number' className='form-control rounded' />
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
                    >Sign in</button>
                </div>


            </div>
            <div style={{
                width: "300px",
                padding: "10px",
                background: "white",
                borderRadius: "5px",
                border: "1px solid black ",
                marginTop: "50px"
            }}>
                <p style={{
                    fontSize: "14px",
                    fontWeight: "500"
                }}>
                    Use Following credentials to login
                </p>
                <div className="">
                    <p style={{
                        fontSize: "14px",
                        fontWeight: "500"
                    }}>
                        User ID
                    </p>
                    <p style={{
                        fontSize: "14px",
                        fontWeight: "400"
                    }}>
                        Test_User2020
                    </p>
                </div>
                <div className="">
                    <p style={{
                        fontSize: "14px",
                        fontWeight: "500"
                    }}>
                        Password
                    </p>
                    <p style={{
                        fontSize: "14px",
                        fontWeight: "400"
                    }}>
                        Easy_123
                    </p>
                </div>

            </div>
        </div>
    )
}

export default AdminAuth;