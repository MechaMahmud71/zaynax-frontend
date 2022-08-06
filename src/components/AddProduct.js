import axios from 'axios'
import React, { useState, useRef } from 'react'
import { API_URL } from '../Utils/api'
import AdminNav from './AdminNav'
import SideNav from './SideNav'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
    const [formData, setFormData] = useState({
        image: "",
        name: "",
        sellingPrice: 0,
        discountRate: 0,
        shippingCharge: 0,
        size: "",
        color: "",
        isActive: false
    })
    const navigate = useNavigate();
    const uploadProduct = async (formData) => {
        try {
            setAdding(true);
            // eslint-disable-next-line no-unused-vars
            const { data: { data } } = await axios.post(API_URL + "/product/add", formData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('adminToken')
                }
            })
            setAdding(false);
            navigate("/admin-products")
        } catch (error) {
            toast.error(error.response.data.error)
            setAdding(false);
        }
    }
    const handleAddProduct = () => {
        let data = new FormData();
        data.append('image', formData.image);
        data.append('name', formData.name);
        data.append('sellingPrice', formData.sellingPrice);
        data.append('discountRate', formData.discountRate);
        data.append('shippingCharge', formData.shippingCharge);
        data.append('size', formData.size);
        data.append('color', formData.color);
        data.append('isActive', formData.isActive);
        uploadProduct(data);
    }



    const handleChangeImage = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    }

    const [adding, setAdding] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const inputRef = useRef();

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
                        <div className='d-flex justify-content-center align-items-center ' style={{ height: "260px", background: "yellow", cursor: "pointer" }} onClick={() => {
                            inputRef.current?.click();

                        }}
                        >


                            {!formData.image ? (
                                <div style={{
                                    padding: "50px",
                                    textAlign: "center"
                                }}>
                                    <p style={{
                                        fontSize: "15px",
                                        fontWeight: "500"
                                    }}>Upload Product Image</p>
                                    <p style={{
                                        fontSize: "13px",
                                        fontWeight: "400"
                                    }}>Image Size Must be 500x500</p>
                                </div>
                            ) : < img style={{ width: "100%", height: "100%", objectFit: "cover" }} alt='' src={URL.createObjectURL(formData.image)} />}

                        </div>
                        <input
                            type="file"
                            ref={inputRef}
                            onChange={handleChangeImage}
                            hidden
                        />
                        <div className="form-group mt-2">
                            <label htmlFor="" className='form-label'>Product Name</label>
                            <input onChange={handleChange} type="text" name="name" id="" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className='form-label'>Product Price (Before Discount)</label>
                            <input onChange={handleChange} type="text" name="sellingPrice" id="" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className='form-label'>Discount Rate</label>
                            <input onChange={handleChange} type="text" name="discountRate" id="" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className='form-label'>Shipping Charge</label>
                            <input onChange={handleChange} type="text" name="shippingCharge" id="" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className='form-label'>Color</label>
                            <input onChange={handleChange} type="text" name="color" id="" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className='form-label'>Size</label>
                            <input onChange={handleChange} type="text" name="size" id="" className="form-control" />
                        </div>
                        <div className="form-check form-switch d-flex justify-content-between mt-2">
                            <label htmlFor="" className='form-label'>Active</label>
                            <input onChange={() => setFormData({ ...formData, isActive: !formData.isActive })} type="checkbox" value={formData.isActive} name="isActive" id="" className="form-check-input" />
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <button onClick={handleAddProduct} disabled={adding} className="btn rounded-pill" style={{ background: "yellow", fontWeight: "500" }}>{adding ? "Adding Product..." : "Add Product"}</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddProduct