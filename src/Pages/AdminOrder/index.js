import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdminNav from '../../components/AdminNav'
import SideNav from '../../components/SideNav'
import { API_URL } from '../../Utils/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../components/Loading';

const AdminOrder = () => {
    const [state, setState] = useState('all');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getOrders()
    }, [])

    async function getOrders() {
        try {
            setLoading(true);
            const { data: { data } } = await axios.get(API_URL + "/order/all", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('adminToken')
                }
            })
            setOrders(data);
            localStorage.setItem('orders', JSON.stringify(data));
            setLoading(false);
            // return data;
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }

    const handleFilter = async (filter) => {
        setState(filter);

        let newArr = JSON.parse(localStorage.getItem('orders'));

        if (filter !== "all") {

            newArr = newArr.filter(el => el.status === filter);

        } else {
            newArr = JSON.parse(localStorage.getItem('orders'));
        }
        setOrders(newArr)

    }

    const handleStatus = async (status, el) => {

        try {
            const { data: { data } } = await axios.put(API_URL + "/order/change-status/" + el._id, {
                status: status
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('adminToken')
                }
            })
            setOrders(data)
            localStorage.setItem('orders', JSON.stringify(data));
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
                    {loading && <div className='d-flex pt-5 justify-content-center align-items-center'>
                        <Loading />
                        <div>Loading...</div>
                    </div>}
                    {!loading && <>
                        <div className="p-3">
                            <div className="row">
                                <div className={state === "all" ? "col-2 rounded me-3 all" : "col-2 rounded me-3"} role="button" style={{
                                    height: "80px",
                                    padding: "10px",
                                    background: "white"
                                }} onClick={() => handleFilter('all')}>All</div>
                                <div className={state === "Pending" ? "col-2 rounded me-3 pending" : "col-2 rounded me-3"} role="button" style={{
                                    height: "80px",
                                    padding: "10px",
                                    background: "white"
                                }} onClick={() => handleFilter('Pending')}>Pending</div>
                                <div className={state === "Confirmed" ? "col-2 rounded me-3 confirmed" : "col-2 rounded me-3"} role="button" style={{
                                    height: "80px",
                                    padding: "10px",
                                    background: "white "
                                }} onClick={() => handleFilter('Confirmed')}>Confirmed</div>
                                <div className={state === "Canceled" ? "col-2 rounded me-3 canceled" : "col-2 rounded me-3"} role="button" style={{
                                    height: "80px",
                                    padding: "10px",
                                    background: "white"
                                }} onClick={() => handleFilter('Canceled')} >Canceled</div>
                            </div>
                        </div>
                        {orders ? (
                            <table className='row mt-3 mb-5'
                                style={{
                                    width: "90%",
                                    marginLeft: "10px"
                                }}>
                                <thead>
                                    <tr className='row'>
                                        <th className='col-1'>SL</th>
                                        <th className='col-3'>Order No</th>
                                        <th className='col-2'>Item Price</th>
                                        <th className='col-4 text-center'>Action</th>
                                        <th className='col-1'>Status</th>
                                    </tr>
                                </thead>
                                {orders?.map((el, index) => (
                                    <>
                                        <tbody>
                                            <tr key={index} className="row d-flex align-items-center rounded">
                                                <td className='col-1'>{index + 1}</td>
                                                <td className='col-3'>{el.orderNo}</td>
                                                <td className='col-2'>{el.total}</td>
                                                <td className='col-4 d-flex justify-content-center'>
                                                    {el.status === "Pending" && <>
                                                        <div className="d-flex">
                                                            <button className="btn rounded-pill" style={{
                                                                background: "yellow",
                                                                padding: "5px 20px"
                                                            }}
                                                                onClick={() => handleStatus('Confirmed', el)}
                                                            >Confirm</button>
                                                            <button className="btn rounded-pill" style={{
                                                                color: "white",
                                                                background: "#e11d48",
                                                                padding: "5px 20px",
                                                                marginLeft: "10px"
                                                            }} onClick={() => handleStatus('Canceled', el)}>Cancel</button>
                                                        </div>
                                                    </>}
                                                </td>
                                                <td className='col-1'>{el.status}</td>
                                            </tr>
                                        </tbody>
                                    </>
                                ))}
                            </table>
                        ) : <h3>NO Order is Placed</h3>}
                    </>}
                </div>
            </div>
        </div>
    )
}

export default AdminOrder