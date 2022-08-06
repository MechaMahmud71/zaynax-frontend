import axios from 'axios'
import React, { useState } from 'react'
import { API_URL } from '../Utils/api'
import AdminNav from './AdminNav'
import SideNav from './SideNav'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const AddPromoCode = () => {
    const [formData, setFormData] = useState({
        code: "",
        startDate: "",
        endDate: 0,
        discountRate: 0,
        useTime: 0,
        usage: 0,
        isActive: false
    })
    const navigate = useNavigate();

    const uploadPromoCode = async () => {
        try {
            setAdding(true);
            // eslint-disable-next-line no-unused-vars
            const { data: { data } } = await axios.post(API_URL + "/promo-code/create", formData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('adminToken')
                }
            })
            setAdding(false);
            navigate("/promo-codes")
        } catch (error) {
            toast.error(error.response.data.error)
            setAdding(false);
        }
    }


    const [adding, setAdding] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    return (
        <div className=''>
            <ToastContainer />
            <AdminNav />
            <div className="row">
                <SideNav />

                <div className="col-10 d-flex justify-content-center align-items-center" style={{
                    background: "#f9fafb"
                }}>
                    <div style={{ width: "300px", padding: "20px", background: "white", borderRadius: "8px" }}>
                        <div className="form-group mt-2">
                            <label htmlFor="" className='form-label'>Promo Code</label>
                            <input onChange={handleChange} type="text" name="code" id="" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className='form-label'>Start Date</label>
                            <input onChange={handleChange} type="Date" name="startDate" id="" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className='form-label'>End Date</label>
                            <input onChange={handleChange} type="Date" name="endDate" id="" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className='form-label'>Discount Rate</label>
                            <input onChange={handleChange} type="text" name="discountRate" id="" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className='form-label'>Use Time </label>
                            <input onChange={handleChange} type="text" name="useTime" id="" className="form-control" />
                        </div>
                        <div className="form-check form-switch d-flex justify-content-between mt-2">
                            <label htmlFor="" className='form-label'>Active</label>
                            <input onChange={() => setFormData({ ...formData, isActive: !formData.isActive })} type="checkbox" value={formData.isActive} name="isActive" id="" className="form-check-input" />
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <button onClick={uploadPromoCode} disabled={adding} className="btn rounded-pill" style={{ background: "yellow", fontWeight: "500" }}>{adding ? "Adding Code..." : "Add Promo Code"}</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddPromoCode