import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../../components/AdminNav';
import SideNav from '../../components/SideNav';
import { API_URL } from '../../Utils/api';
import axios from 'axios';
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PromoCodes = () => {
    const navigate = useNavigate();
    const [codes, setCodes] = useState([]);

    useEffect(() => {
        getCoupons();
    }, [])
    async function getCoupons() {
        try {
            const { data: { data } } = await axios.get(API_URL + "/promo-code/get-all", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('adminToken')
                }
            });
            setCodes(data)
        } catch (error) {
            setCodes([])
        }
    }
    const handleStatus = async (status, el) => {
        try {
            const { data: { data } } = await axios.put(API_URL + "/promo-code/change-status/" + el?._id, {
                status: status
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('adminToken')
                }
            })
            setCodes(data)
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }
    return (
        <div className=''>
            <ToastContainer />
            <AdminNav />
            <div className="row">
                <SideNav />

                <div className="col-10" style={{
                    background: "#f9fafb"
                }}>
                    <div >
                        <button style={{
                            backgroundColor: "white"
                        }} className='btn rounded-pill mt-3 fw-bold border' onClick={() => navigate("/add-promo-codes")} >
                            Add New Promo Code
                        </button>
                    </div>
                    {codes && codes?.map((el, index) => (
                        <div className="mt-4 rounded border" key={index} style={{
                            width: "80%",
                            background: "white"
                        }}>
                            <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                                <div className="d-flex" style={{ fontWeight: "500" }}>
                                    <div className="me-3 ms-3">{index + 1}</div>
                                    <div className="text-cadivitalize">{el.code}</div>
                                </div>
                                <div className='d-flex align-items-center px-3'>
                                    <button onClick={() => navigate("/edit-promo-code/" + el._id)} className="btn rounded-pill px-5 py-2 me-3" style={{ backgroundColor: "yellow", fontWeight: "500" }}>Edit</button>
                                    {el.isActive ? (
                                        <button onClick={() => handleStatus(false, el)} className="btn rounded-pill px-5 py-2" style={{ backgroundColor: "#fecdd3", color: "#e11d48", fontWeight: "500" }}>Deactive</button>
                                    ) : <button onClick={() => handleStatus(true, el)} className="btn rounded-pill px-5 py-2" style={{ backgroundColor: "#fef9c3", color: "#713f12", fontWeight: "500" }}>Active</button>}
                                </div>
                            </div>
                            <div className="d-flex justify-content-between px-3 py-3" style={{
                                fontSize: "14px",
                                fontWeight: "500"
                            }}>
                                <div>Created at: {moment(el.createdAt).format("h:mm A,DD/MM/YYYY")}</div>
                                <div>Usages:{el.usage}</div>
                                <div>Discount Rate: {el.discountRate}%</div>
                                <div>Start Data: {moment(el.startDate).format("DD/MM/YYYY")}</div>
                                <div>End Data: {moment(el.endDate).format("DD/MM/YYYY")}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PromoCodes