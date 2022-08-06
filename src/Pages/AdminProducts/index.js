import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminProduct from '../../components/AdminProduct'
import AdminNav from '../../components/AdminNav'
import SideNav from '../../components/SideNav'
import { API_URL } from '../../Utils/api';
import { useNavigate } from 'react-router-dom';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, [])

    async function getProducts() {
        try {
            const { data: { data } } = await axios.get(API_URL + "/product/admin-products");
            setProducts(data)
        } catch (error) {
            setProducts([])
        }
    }
    return (
        <div className=''>
            <AdminNav />
            <div className="row">
                <SideNav />

                <div className="col-10" style={{
                    background: "#f9fafb"
                }}>
                    <div >
                        <button style={{
                            backgroundColor: "white"
                        }} className='btn rounded-pill mt-3 fw-bold border' onClick={() => navigate("/add-product")} >
                            Add New Product
                        </button>
                    </div>
                    <div className="row">
                        {products && products?.map((el, index) => (
                            <div className="col-2 m-3" style={{ background: "white" }} key={index}>
                                <AdminProduct product={el} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminProducts